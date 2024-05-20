import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const BreakoutStyle = styled.div`
    body{
        text-align: center;
    }
    #board {
        background-color: black;
        border-top: 5px solid skyblue;
        border-left: 5px solid skyblue;
        border-right: 5px solid skyblue;
    }
    .container{
        color: #fff;
        padding-top: 10%;
    }
`

const Breakout: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'running' | 'lost' | 'won'>('running');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let paddle = {
      x: canvas.width / 2 - 50 / 2,
      y: canvas.height - 20,
      width: 100,
      height: 10,
    };

    let ball = {
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: 2,
      dy: -2,
      radius: 7,
    };

    let bricks = Array(6).fill(null).map(() => Array(10).fill(true));

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
    };

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
    };

    const drawBricks = () => {
      bricks.forEach((row, i) => {
        row.forEach((_, j) => {
          if (bricks[i][j]) {
            ctx.beginPath();
            ctx.rect(10 + j * 60, 10 + i * 20, 50, 5);
            ctx.fillStyle = 'red';
            ctx.fill();
            ctx.closePath();
          }
        });
      });
    };

    const collisionDetection = () => {
      // Wall collision
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx;
      }
      if (ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
      }
      if (ball.y + ball.radius > canvas.height - paddle.height) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
            setGameState('won');
          ball.dy = -ball.dy;
        } else {
          setGameState('won');
        }
      }

      // Paddle collision
      if (ball.x > paddle.x && ball.x < paddle.x + paddle.width && ball.y + ball.radius > canvas.height - paddle.height) {
        ball.dy = -ball.dy;
      }

      // Brick collision
      bricks.forEach((row, i) => {
        row.forEach((_, j) => {
          if (bricks[i][j]) {
            if (ball.x - ball.radius < 10 + j * 60 + 50 && ball.x + ball.radius > 10 + j * 60 && ball.y - ball.radius < 10 + i * 20 + 20 && ball.y + ball.radius > 10 + i * 20) {
              ball.dy = -ball.dy;
              bricks[i][j] = false;
            }
          }
        });
      });

      // Check for win condition
      if (bricks.every(row => row.every(brick => !brick))) {
        setGameState('won');
      }
    };

    const updateGame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawBricks();
      drawBall();
      drawPaddle();

      collisionDetection();

      ball.x += ball.dx;
      ball.y += ball.dy;

      if (gameState === 'running') {
        requestAnimationFrame(updateGame);
      }
    };

    const keyDownHandler = (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          if (paddle.x > 0) {
            paddle.x -= 7;
          }
        }
        if (e.key === 'ArrowRight') {
          if (paddle.x + paddle.width < canvas.width) {
            paddle.x += 7;
          }
        }
      };      

    document.addEventListener('keydown', keyDownHandler);

    updateGame();

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <BreakoutStyle>
        <div className='container'>
            <canvas  id = "board" ref={canvasRef} width={600} height={500} />
            {gameState === 'lost' && <h1>You lost!</h1>}
            {gameState === 'won' && <h1>You won!</h1>}
        </div>
    </BreakoutStyle>
  );
};

export default Breakout;
