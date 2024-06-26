import React, { useState, useEffect } from 'react';
import { checkWinner } from './utilities';
const MediumBoard = () => {
  const initialBoard = Array.from({ length: 15 }, () => Array(15).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [availableMoves, setAvailableMoves] = useState([]);
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (player === 'O' && !winner && !gameOver) {
      makeAIMove();
    }
  }, [player, winner, gameOver]);

const handleClick = (row, col) => {
    if (board[row][col] || winner || gameOver) return;
    const newBoard = board.map((rowArray, rowIndex) =>
      rowIndex === row ? rowArray.map((value, colIndex) => (colIndex === col ? player : value)) : rowArray
    );
    setBoard(newBoard);
    setPlayer(player === 'X' ? 'O' : 'X');

    // console.log("player",row,col);
    let newAiArr=[]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let newRow=row-1 +i;
            let newCol=col-1 +j;
            if(newRow>0&&newCol>0&&newRow<14&&newCol<14){
                newAiArr.push({row:newRow,col:newCol})
            }
           
        }
    }
    setAvailableMoves(newAiArr);
  };

  const makeAIMove = () => {
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    const { row, col } = availableMoves[randomIndex];
//    let availableMovesWithplayer=availableMoves.map(({row,col})=>{
//      return { row,col,char:board[row][col]}
//    })
//    console.log(availableMoves);
    
    const newBoard = board.map((rowArray) => [...rowArray]);
    if(newBoard[row][col]==null){
        newBoard[row][col] = 'O';
    }else{
        newBoard[row+randomIndex-3 ][col+randomIndex-3] = 'O'
     
    }
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
            <button key={colIndex} className="square"
            id={`square-${rowIndex + "-" +colIndex}`}
            onClick={() => handleClick(rowIndex, colIndex)}>
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

export default MediumBoard;
