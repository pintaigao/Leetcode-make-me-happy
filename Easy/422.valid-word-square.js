var validWordSquare = function (words) {
  let rows = words.length,
    cols = words[0].length;
  if (rows != cols) {
    return false;
  } else {
    for (let i = 0; i < rows; i++) {
      if (words[i].length > words.length) return false
      for (let j = 0; j < cols; j++) {
        if (words[i][j] != words[j][i]) return false
      }
    }
  }
  return true
};