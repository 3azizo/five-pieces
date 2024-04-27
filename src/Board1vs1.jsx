import React, { useState, useEffect } from 'react';
import {checkWinner} from "./utilities"
const Board1vs1 = () => {
  const initialBoard = Array.from({ length: 15 }, () => Array(15).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (row, col) => {
    if (board[row][col] || winner || gameOver) return;
    const newBoard = board.map((rowArray, rowIndex) =>
      rowIndex === row ? rowArray.map((value, colIndex) => (colIndex === col ? player : value)) : rowArray
    );
    setBoard(newBoard);
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setPlayer('X');
    setWinner(null);
    setGameOver(false);
  };

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      setGameOver(true);
    }
  }, [board]);

  return (
    <div className="board">
      <div className="status">
        {winner ? `Winner: ${winner}` : gameOver ? 'Draw!' : `Next player: ${player}`}
      </div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((square, colIndex) => (
            <button key={colIndex} className="square" onClick={() => handleClick(rowIndex, colIndex)}>
              {square}
            </button>
          ))}
        </div>
      ))}
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
};

export default Board1vs1;
