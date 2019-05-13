/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function(board) {
  //1 or 0 neighbors, die
  //2 or 3 neighbors, live
  //more than 3 neighbors, die
  //dead cell with three neighbors, live
  const array = new Array(board.length).fill().map(() => new Array(board[0].length).fill(0))
 
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
          let count = countNeighbors(i, j);
          if (count < 2 || count > 3) {
              array[i][j] = 0
          } else if (board[i][j] === 0 && count === 3) {
              array[i][j] = 1;
          } else {
              array[i][j] = board[i][j];
          }
      }
  }
  
  array.forEach((row, i) => {
      row.forEach((element, j) => {
          board[i][j] = element
      })
  })
  
  function countNeighbors(i, j){
      let count = 0;
      for (let k = i - 1; k < i + 2; k++) {
          for (let l = j - 1; l < j + 2; l++) {
              if (k === i && l === j || !board[k] || !board[k][l]) {
                  continue;
              }
              if (board[k][l] === 1) {
                  count++
              }
          }
      }
      return count;
  }

};
