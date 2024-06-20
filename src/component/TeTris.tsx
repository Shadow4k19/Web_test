import styled from "styled-components";
import { useEffect, useRef, useState } from "react";

const TetrisStyle = styled.div`
  .container {
    background-color: #282828;
    color: #fff;
    font-size: 2em;
    text-align: center;
    padding-top: 5%;
    width: 100%;
    height: auto;
    min-height: 100vh;
  }

  canvas {
    border: solid 0.2em #fff;
  }
  .modal {
    display: flex; 
    flex-direction: column;
    width: 450px;
    height: 180px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    border-radius: 5px;
  }
  
  .btn {
    padding: 10px 20px;
    background-color: red;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  .btn-danger {
    background-color: red;
  }
  
  h2{
    display: inline-block;
    color: #000;
  }

  .guide-con{
    display : flex;
    justify-content: center;
    margin : 0 0 20px;
  }

  .inside-guidecon{
    background-color : #fff;
    color : #000;
    padding : 10px;
    border : 1px solid #000;
    border-radius : 20px;
  }
  @media screen and (max-width: 768px){
    .container{
      padding: 15% 0 0 0; 
    }  
    .modal{
      height : 130px;
    }
  }
`;

const Tetris : React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [endgame, setEndgame] = useState(false);
    const createMatrix = (w: number, h: number) => {
      const matrix = [];
      while (h--) {
        matrix.push(new Array(w).fill(0));
      }
      return matrix;
    };
    const createPiece = (type: string) => {
        if (type === "I") {
          return [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 1, 0, 0],
          ];
        } else if (type === "L") {
          return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
          ];
        } else if (type === "J") {
          return [
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0],
          ];
        } else if (type === "O") {
          return [
            [4, 4],
            [4, 4],
          ];
        } else if (type === "Z") {
          return [
            [5, 5, 0],
            [0, 5, 5],
            [0, 0, 0],
          ];
        } else if (type === "S") {
          return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
          ];
        } else if (type === "T") {
          return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
          ];
        }
        return null;
      };
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");
      if (!context) return;
  
      context.scale(20, 20);
  
      const arena = createMatrix(12, 20);
      const player = {
        pos: { x: 0, y: 0 },
        matrix: createPiece("T")!,
        score: 0,
      };
  
    const colors = [
      null,
      "#ff0d72",
      "#0dc2ff",
      "#0dff72",
      "#f538ff",
      "#ff8e0d",
      "#ffe138",
      "#3877ff",
    ];

    const arenaSweep = () => {
      let rowCount = 1;
      outer: for (let y = arena.length - 1; y > 0; --y) {
        for (let x = 0; x < arena[y].length; ++x) {
          if (arena[y][x] === 0) {
            continue outer;
          }
        }
        const row = arena.splice(y, 1)[0].fill(0);
        arena.unshift(row);
        ++y;
        player.score += rowCount * 10;
        rowCount *= 2;
      }
    };

    const collide = (arena: number[][], player: any) => {
      const m = player.matrix;
      const o = player.pos;
      for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
          if (
            m[y][x] !== 0 &&
            (arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0
          ) {
            return true;
          }
        }
      }
      return false;
    };

    

    const drawMatrix = (matrix: number[][], offset: { x: number; y: number }) => {
        matrix.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              context.fillStyle = colors[value] ?? '#fff';
              context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
          });
        });
      };
      

      const draw = () => {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);
        drawMatrix(arena, { x: 0, y: 0 });
        drawMatrix(player.matrix, player.pos);
      };

    const merge = (arena: number[][], player: any) => {
      player.matrix!.forEach((row: number[], y: number) => {
        row.forEach((value: number, x: number) => {
          if (value !== 0) {
            arena[y + player.pos.y][x + player.pos.x] = value;
          }
        });
      });
    };

    const rotate = (matrix: number[][], dir: number) => {
      for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < y; ++x) {
          [matrix[x][y], matrix[y][x]] = [matrix[y][x], matrix[x][y]];
        }
      }
      if (dir > 0) {
        matrix.forEach((row) => row.reverse());
      } else {
        matrix.reverse();
      }
    };

    const playerDrop = () => {
      player.pos.y++;
      if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        playerReset();
        arenaSweep();
        updateScore();
      }
      dropCounter = 0;
    };

    const playerMove = (dir: number) => {
      player.pos.x += dir;
      if (collide(arena, player)) {
        player.pos.x -= dir;
      }
    };

    const playerReset = () => {
      const pieces = "TJLOSZI";
      const piece = createPiece(pieces[(pieces.length * Math.random()) | 0]);
      player.matrix = piece ? piece : createPiece("T")!;
      player.pos.y = 0;
      player.pos.x =
        ((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
      if (collide(arena, player)) {
        arena.forEach((row) => row.fill(0));
        player.score = 0;
        updateScore();
      }
    };

    const playerRotate = (dir: number) => {
      const pos = player.pos.x;
      let offset = 1;
      rotate(player.matrix!, dir);
      while (collide(arena, player)) {
        player.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));
        if (offset > player.matrix![0].length) { 
          rotate(player.matrix!, -dir); 
          player.pos.x = pos;
          return;
        }
      }
    };

    let dropCounter = 0;
    let dropInterval = 1000;
    let lastTime = 0;

    const update = (time = 0) => {
      const deltaTime = time - lastTime;
      dropCounter += deltaTime;
      if (dropCounter > dropInterval) {
        playerDrop();
      }
      lastTime = time;
      draw();
      requestAnimationFrame(update);
    };

    const updateScore = () => {
      document.getElementById("score")!.innerText = "Score: " + player.score;
    };

    document.addEventListener("keydown", (event) => {
        if (event.keyCode === 74) {
        playerMove(-1);
      } else if (event.keyCode === 76) {
        playerMove(1);
      } else if (event.keyCode === 75) {
        playerDrop();
      } else if (event.keyCode === 81) {
        playerRotate(-1);
      } else if (event.keyCode === 87) {
        playerRotate(1);
      }
    });

    playerReset();
    updateScore();
    update();

    return () => {
      document.removeEventListener("keydown", (event) => {
        console.log(event);
      });
    };
  }, []);

  const handleRestart = () =>{
    window.location.reload();
  }
  return (
    <TetrisStyle>
      <div className="container">
        <div id="score"></div>
        <div className="guide-con">
            <div className="inside-guidecon">
              <h2>!GUIDE!</h2>
              <h4>use J,K,L to move use Q,W to rotate</h4>
            </div>
        </div>
        <canvas ref={canvasRef} id="tetris" width = "240" height = "400"></canvas>
      {endgame && (
        <div className="modal">
          <h2>endgame Score: </h2>
          <button className="btn btn-danger" onClick={() => setEndgame(false)}>Ok</button>
        </div>
      )}
        <div>
          <button className="btn btn-danger" onClick={handleRestart}>Restart</button>
        </div>  
      </div>
    </TetrisStyle>
  );
};

export default Tetris;
