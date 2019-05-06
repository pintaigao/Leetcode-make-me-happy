/**
 * @param {string[]} words
 * @return {boolean}
 */
var validWordSquare = function (words) {
  let row = words.length;
  let colum = words[0].length;

  if(row !== colum) {
    return false;
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < words[i].length; j++) {
      if (words[j][i] === undefined) {
        return false;
      }
      if (words[i][j] !== words[j][i]) {
        return false;
      }
    }
  }
  return true;
};