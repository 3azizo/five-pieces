// src/Board.js

import React, { useState, useEffect } from 'react';

const Board = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (player === 'O') {
      makeAIMove(board);
    }
  }, [player, board]);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const calculateWinner = () => {
    const winner = checkWinner(board);
    if (winner) {
      setWinner(winner);
    }
  };

  const isBoardFull = (squares) => {
    return squares.every((square) => square !== null);
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = player;
    setBoard(newBoard);
    setPlayer(player === 'X' ? 'O' : 'X');
  };

  const minimax = (squares, depth, maximizingPlayer) => {
    const result = checkWinner(squares);
    if (result !== null) {
      return result === 'X' ? -10 + depth : 10 - depth;
    }
    if (isBoardFull(squares)) {
      return 0;
    }

    if (maximizingPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          const newSquares = [...squares];
          newSquares[i] = 'O';
          const score = minimax(newSquares, depth + 1, false);
          bestScore = Math.max(bestScore, score);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
          const newSquares = [...squares];
          newSquares[i] = 'X';
          const score = minimax(newSquares, depth + 1, true);
          bestScore = Math.min(bestScore, score);
        }
      }
      return bestScore;
    }
  };

  const makeAIMove = (squares) => {
    let bestMove;
    let bestScore = -Infinity;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        const newSquares = [...squares];
        newSquares[i] = 'O';
        const score = minimax(newSquares, 0, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    if (bestMove !== undefined) {
      const newBoard = [...squares];
      newBoard[bestMove] = 'O';
      setBoard(newBoard);
      setPlayer('X');
    }
  };

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setPlayer('X');
    setWinner(null);
  };

  useEffect(() => {
    calculateWinner();
  }, [board]);

  return (
    <div className="board">
      <div className="status">{winner ? `Winner: ${winner}` : `Next player: ${player}`}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart-button" onClick={restartGame}>Restart Game</button>
    </div>
  );
};

export default Board;

