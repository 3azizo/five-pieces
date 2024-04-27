import React, { useState, useEffect } from 'react';
import { checkWinner } from './utilities';
const EasyBoard = () => {
  const initialBoard = Array.from({ length: 15 }, () => Array(15).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (player === 'O' && !winner && !gameOver) {
      makeAIMove();
    }
  }, [player, winner, gameOver]);
  // const isBoardFull = (squares) => {
  //   // Check if the board is full
  //   for (let row = 0; row < 15; row++) {
  //     for (let col = 0; col < 15; col++) {
  //       if (squares[row][col] === null) {
  //         return false;
  //       }
  //     }
  //   }
  //   return true;
  // };

  const handleClick = (row, col) => {
    if (board[row][col] || winner || gameOver) return;
    const newBoard = board.map((rowArray, rowIndex) =>
      rowIndex === row ? rowArray.map((value, colIndex) => (colIndex === col ? player : value)) : rowArray
    );
    setBoard(newBoard);
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const makeAIMove = () => {
    const availableMoves = [];
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 15; col++) {
        if (board[row][col] === null) {
          availableMoves.push({ row, col });
        }
      }
    }

    // Select a random available move
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const { row, col } = availableMoves[randomIndex];

    const newBoard = board.map((rowArray) => [...rowArray]);
    newBoard[row][col] = 'O';
    setBoard(newBoard);
    setPlayer('X');
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

export default EasyBoard;
