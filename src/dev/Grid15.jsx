import React, { useState, useEffect } from 'react';

const Grid_15 = () => {
  const initialBoard = Array.from({ length: 15 }, () => Array(15).fill(null));
  const [board, setBoard] = useState(initialBoard);
  let [selectMode,SetSelectMode]=useState("onebyone")
  function handleClick(row, col) {
    if (selectMode === "square") {
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let newRow = row - 1 + i;
          let newCol = col - 1 + j;
          let selectedSq = document.getElementById(`square-${newRow + "-" + newCol}`);
          if (selectedSq) {
            selectedSq.classList.add("played-square");
          }
        }
      }
    } else if (selectMode === "onebyone") {
      let selectedSq = document.getElementById(`square-${row + "-" + col}`);
      if (selectedSq) {
        selectedSq.classList.add("played-square");
      }
    } else if (selectMode === "horizontally5") {
      for (let i = 0; i < 5; i++) {
        let newCol = col - 2 + i;
        let selectedSq = document.getElementById(`square-${row + "-" + newCol}`);
        if (selectedSq) {
          selectedSq.classList.add("played-square");
        }
      }
    } else if (selectMode === "vertically5") {
      for (let i = 0; i < 5; i++) {
        let newRow = row - 2 + i;
        let selectedSq = document.getElementById(`square-${newRow + "-" + col}`);
        if (selectedSq) {
          selectedSq.classList.add("played-square");
        }
      }
    } else if (selectMode === "diagonallyT-L-B-R") {
      for (let i = 0; i < 5; i++) {
        let newRow = row - 2 + i;
        let newCol = col - 2 + i;
        let selectedSq = document.getElementById(`square-${newRow + "-" + newCol}`);
        if (selectedSq) {
          selectedSq.classList.add("played-square");
        }
      }
    } else if (selectMode === "diagonallyT-R_B-L") {
      for (let i = 0; i < 5; i++) {
        let newRow = row - 2 + i;
        let newCol = col + 2 - i;
        let selectedSq = document.getElementById(`square-${newRow + "-" + newCol}`);
        if (selectedSq) {
          selectedSq.classList.add("played-square");
        }
      }
    }
  }
  function handleReset() {
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
      square.classList.remove('played-square');
    });
  }

  const handleChange = (event) => {
    SetSelectMode(event.target.value);
    console.log(selectMode);
  };
  return (
    <div className="board">
        <div className="mode status">
            <span>selection mode</span>{"  "}
        <select value={selectMode} onChange={handleChange}>
        <option value="onebyone">one by one</option>
        <option value="square">square 3 x 3</option>
        <option value="horizontally5">5 by 5 horizontally</option>
        <option value="vertically5">5 by 5 vertically</option>
        <option value="diagonallyT-L-B-R">5 by 5 diagonally</option>
        <option value="diagonallyT-R_B-L">5 by 5 diagonally r</option>
      </select>
        </div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((square, colIndex) => (
            <button key={colIndex} className="square grid-square" 
            id={`square-${rowIndex + "-" +colIndex}`}
            onClick={handleClick.bind(this,rowIndex,colIndex)}>
              {rowIndex + " " +colIndex}
            </button>
          ))}
        </div>
      ))}
      <button className="restart-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default Grid_15;
