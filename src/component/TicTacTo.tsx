    import styled from "styled-components";
    import { useState, useEffect } from "react";
    import Swal from "sweetalert2";

    const TicTacToCss = styled.div`
        .section{
            height: auto;
            min-height: 100vh;
            padding: 120px 0 120px 0; 
        }
        .container{
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5% 0 2% 0;
            flex-direction: column;
            overflow: hidden;
            background-color: #CCBEBE;
            border-radius: 5px;
        }
        .container h1 {
            font-size: 3.5rem;
            color: #000;
        }
        #gameboard {
            width: 400px;
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 10px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 5px;
            padding: 10px; 
        }
        .modal {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 650px;
            height: 400px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 5px 10px 10px #000;
            transition: all 0.8 ease-in;
            position: absolute;
        }
        .box {
            height: 130px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #F58815;
            background: #5E5852;
            font-weight: 600;
            font-size: 5.5rem;
            box-shadow: 2px 5px 5px #000;
            border-radius: 5px;
        }
        .modal-container{
            display: flex;
            justify-content: center;
            align-items: center;
            position: fixed;
            top: 30%;
            left: 28.5%;
        }
        .content {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            height: 100%;
        }
        .content h2{
            font-size: 2.5rem;
        }
        button{
            outline: none;
            border: none;   
            padding: 0.8rem 4rem;
            margin-top: 2rem;
            border-radius: 5px;
            font-family: inherit;
            width: 320px;
            cursor: pointer;
            background: #fff;
            color: #000;
            font-weight: 600;
            background-color: #f11111;
        }
    button:active{
        transform: scale(0.94);
    }
    @media screen and (max-width: 700px){
        #gameboard{
            width: 350px;
        }
        .box{
            height: 90px;
            font-size: 4rem;
        }
    }
    @media screen and (max-width: 900px) and (max-height: 600px){
        #gameboard{
            width: 300px;
        }
        .box{
            height: 70px;
            font-size: 4rem;
        }
        .container{
            padding-top: 6%;
        }
    }
    `;

    const TicTacTo : React.FC = () => {
        const [currentPlayer, setCurrentPlayer] = useState("X");
        const [spaces, setSpaces] = useState(Array(9).fill(null));
        const [winningBoxes, setWinningBoxes] = useState<number[]>([]);
        const [isGameWon, setIsGameWon] = useState(false);
        const [isGameDraw, setIsGameDraw] = useState(false);
        const ContainerEI = document.querySelector(".container-tic");
        const winningConditions = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
      
        const boxClicked = (index : number) => {
          if (spaces[index] === null && winningBoxes.length === 0) {
            const newSpaces = [...spaces];
            newSpaces[index] = currentPlayer;
            setSpaces(newSpaces);
      
            if (playerWon(newSpaces)) {
              setWinningBoxes(winningBoxesForPlayer(currentPlayer, newSpaces));
              setIsGameWon(true);
              ContainerEI?.classList.add("success");
            } else {
              if(newSpaces.filter(spaces => spaces === null).length === 0){
                setIsGameDraw(true)
              }
              setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
            }
          }
        };
      
        const playerWon = (spaces : any) => {
          for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
              return true;
            }
          }
          return false;
        };
      
        const winningBoxesForPlayer = (player : any, spaces : any) => {
          const winningBoxes = [];
          for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (spaces[a] === player && spaces[b] === player && spaces[c] === player) {
              winningBoxes.push(a, b, c);
            }
          }
          return winningBoxes;
        };
        const handleRestart = () =>{
            setSpaces(Array(9).fill(null));
  
            setWinningBoxes([]);
            
            setCurrentPlayer("X");
          
            ContainerEI?.classList.remove("success");
            if(isGameWon){
                setIsGameWon(false);
            }else{
                setIsGameDraw(false);
            }
        }
        useEffect(() => {
            if (isGameWon) {
                Swal.fire({
                    title: `Congratulations Player ${currentPlayer}`,
                    text: "You've Won the Game :)",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Restart',
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleRestart();
                    }
                });
            }
        }, [isGameWon, currentPlayer]);
        useEffect(() => {
            if (isGameDraw) {
                Swal.fire({
                    title: 'Nah It Draw',
                    text: 'Not have a Winner :(',
                    icon: 'info',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Restart',
                }).then((result) => {
                    if (result.isConfirmed) {
                        handleRestart();
                    }
                });
            }
        }, [isGameDraw]);
        return (
            <TicTacToCss>
                <div className="section">
                    <div className="container">
                        <h1>Tic Tac Toe</h1>
                        <div id="gameboard">
                        {spaces.map((value, index) => (
                            <div
                            className={`box ${winningBoxes.includes(index) ? "winning-box" : ""}`}
                            key={index}
                            id={index.toString()}
                            onClick={() => boxClicked(index)}
                            >
                            {value}
                            </div>
                        ))}
                        </div>
                            <button className="btn-danger" onClick={handleRestart}>Restart</button>
                    </div>
                </div>
            </TicTacToCss>
        );
    };

    export default TicTacTo;
