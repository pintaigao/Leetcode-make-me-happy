/**
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function (moves) {
  let array = [0, 0];

  for (let i = 0; i < moves.length; i++) {
    if (moves[i] === 'U') {
      array[0]++;
    }

    if (moves[i] === 'R') {
      array[1]++;
    }

    if (moves[i] === 'D') {
      array[0]--;
    }

    if (moves[i] === 'L') {
      array[1]--;
    }
  }

  return array[0] === 0 && array[1] === 0;
};