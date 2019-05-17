/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  let rows = board.length;
  let cols = board[0].length;
  let temp = Array(rows).fill('.').map(_ => Array(cols).fill('.'));
  console.log(temp);

  let search = (row, col, idx) => {
    if (idx == word.length) return true;
    if (row < 0 || col < 0 || row >= rows || col >= cols || temp[row][col] != '.' || board[row][col] != word.charAt(idx)) return false;

    temp[row][col] = board[row][col];
    let res = search(row + 1, col, idx + 1) || search(row - 1, col, idx + 1) || search(row, col + 1, idx + 1) || search(row, col - 1, idx + 1);
    temp[row][col] = '.';
    return res;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (search(row, col, 0)) return true;
    }
  }

  return false;
};

exist([
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
],"ABCCED");