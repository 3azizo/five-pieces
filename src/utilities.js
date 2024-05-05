export const checkWinner = (squares) => {
    // console.log("check Winner");
    // Check horizontally
    for (let row = 0; row < 15; row++) {
      for (let col = 0; col < 11; col++) {
        if (
          squares[row][col] &&
          squares[row][col] === squares[row][col + 1] &&
          squares[row][col] === squares[row][col + 2] &&
          squares[row][col] === squares[row][col + 3] &&
          squares[row][col] === squares[row][col + 4]
        ) {
          return squares[row][col]; // Return the winner
        }
      }
    }
  
    // Check vertically
    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 15; col++) {
        if (
          squares[row][col] &&
          squares[row][col] === squares[row + 1][col] &&
          squares[row][col] === squares[row + 2][col] &&
          squares[row][col] === squares[row + 3][col] &&
          squares[row][col] === squares[row + 4][col]
        ) {
          return squares[row][col]; // Return the winner
        }
      }
    }
  
    // Check diagonally (from top-left to bottom-right)
    for (let row = 0; row < 11; row++) {
      for (let col = 0; col < 11; col++) {
        if (
          squares[row][col] &&
          squares[row][col] === squares[row + 1][col + 1] &&
          squares[row][col] === squares[row + 2][col + 2] &&
          squares[row][col] === squares[row + 3][col + 3] &&
          squares[row][col] === squares[row + 4][col + 4]
        ) {
          return squares[row][col]; // Return the winner
        }
      }
    }
  
  }