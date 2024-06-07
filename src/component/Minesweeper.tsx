import styled from "styled-components";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

type Cell = {
  mine: boolean;
};

const MineStyle = styled.div`
  .container-lg {
    align-items: center;
    justify-content: center;
    height: auto;
    min-height: 100vh;
    overflow: hidden;
    background-color: #CCBEBE;
    border-radius: 5px;
  }
  h1 {
    color: #000;
    padding-top: 5%; 
    font-size: 120px;
    font-weight: normal;
  }
  #grid {
    margin-left: auto;
    margin-right: auto;
  }
  #grid tr td {
    border: 1px solid #fff;
    background-color: #999;
    width: 40px;
    height: 40px;
    text-align: center;
  }
  #grid tr td.active {
    background-color: #333;
    color: #fff;
  }
  #grid tr td.mine {
    background-color: #999;
  }
  #grid tr td.active-mine {
    background-color: red;
  }
  button {
    margin: 12px 0;
    padding: 4px 0;
    border: none;
    outline: none;
    cursor: pointer;
  }
  .btn{
    width: 200px;
    height: 50px;
  }
  @media screen and (max-width: 600px){
    #grid tr td{
      width: 31.8px;
      height: 31.8px;
    }
    h1{
      padding-top: 20%;
      font-size: 50px;
    }
  }
  @media screen and (max-width: 900px) and (max-height: 600px){
    #grid tr td{
      width: 20px;
      height: 20px;
    }
    h1{
      font-size: 40px;
      padding-top: 10%;
    }
  }
  @media screen and (max-width: 1000px) and (max-height: 600px){
    #grid tr td{
      width: 23px;
      height: 23px;
    }
    h1{
      font-size: 40px;
      padding-top: 6%;
    }
  }
`;

const MineSwiper : React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [minesGenerated, setMinesGenerated] = useState(false);
  const [lockGame, setLockGame] = useState(false);

  useEffect(() => {
    generateGrid();
  }, []);

  useEffect(() => {
    if (grid.length > 0 && !minesGenerated) {
      generateMines();
      setMinesGenerated(true);
    }
  }, [grid, minesGenerated]);
  
  useEffect(() =>{
    if(lockGame){
      revealMines();
    }
  }, [lockGame]);
  const generateGrid = () => {
    setLockGame(false);
    const newGrid: Cell[][] = [];
    for (let i = 0; i < 10; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 10; j++) {
        row.push({ mine: false });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  };

  const generateMines = () => {
    const newGrid = [...grid];
    for (let i = 0; i < 20; i++) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      newGrid[row][col].mine = true;
    }
    setGrid(newGrid);
  };

  const revealMines = () => {
    console.log("Lock Game State:", lockGame);
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
          const cell = document.getElementById(`cell-${i}-${j}`);
          if (cell && grid[i][j].mine) {
            cell.className = lockGame ? "active-mine" : "mine";
          }
      }
    }
  };

  const checkGameComplete = () => {
    let isGameComplete = true;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cellElement = document.getElementById(`cell-${i}-${j}`);
        const cell = cellElement ? cellElement.innerHTML : null;
        if (!grid[i][j].mine && cell === "") {
          isGameComplete = false;
          break; 
        }
      }
      if (!isGameComplete) {
        break; 
      }
    }
  
    if (isGameComplete) {
      Swal.fire({
        icon: "success",
        title: "You Found All mines",
      });
      setLockGame(true);
    }
  };

  const init = (row: number, col: number) => {
    if (lockGame) {
      return;
    } else {
      const cell = grid[row][col];
      if (cell.mine) {
        setLockGame(true);
        Swal.fire({
            icon: "error",
            title: "You Dead",
        })
      } else {
        const cellElement = document.getElementById(`cell-${row}-${col}`);
        if (cellElement) {
          cellElement.className = "active";
        }
        let mineCount = 0;
        for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, 9); i++) {
          for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, 9); j++) {
            if (grid[i][j].mine) {
              mineCount++;
            }
          }
        }
        if (cellElement) {
          cellElement.innerHTML = mineCount.toString();
        }
        if (mineCount === 0) {
          for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, 9); i++) {
            for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, 9); j++) {
              const cellElement = document.getElementById(`cell-${i}-${j}`);
              const cell = cellElement ? cellElement.innerHTML : null;
              if (cell === "") {
                init(i, j);
              }
            }
          }
        }
        checkGameComplete();
      }
    }
  };
  const resetGame = () => {
    window.location.reload();
  }

  return (
    <MineStyle>
      <div className="container-lg">
        <h1>MineSweeper</h1>
        <table id="grid">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((cell, colIndex) => (
                  <td
                    key={`cell-${rowIndex}-${colIndex}`}
                    id={`cell-${rowIndex}-${colIndex}`}
                    onClick={() => init(rowIndex, colIndex)}
                    className={cell.mine ? "mine" : ""}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button className = "btn btn-danger" onClick={resetGame}>Reset Game</button>
      </div>
    </MineStyle>
  );
};

export default MineSwiper;
