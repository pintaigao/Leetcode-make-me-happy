var generatePossibleNextMoves = function (currentState) {
  let res = [], arr = currentState.split('');
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] === '+' && arr[i - 1] === '+') {
      // 做选择
      arr[i] = '-', arr[i - 1] = '-';
      res.push(arr.join(''));
      // 撤销选择
      arr[i] = '+';
      arr[i - 1] = '+';
    }
  }
  return res;
};

var generatePossibleNextMoves = function (currentState) {
  let res = [], arr = currentState.split('');
  // 正常人能想到的解法是从左往右遍历，遇到连续的两个加号就做选择
  for (let i = 0; i + 1 < arr.length; i += 1) {
    if (arr[i] === '+' && arr[i + 1] === '+') {
      // 做选择
      arr[i] = '-', arr[i + 1] = '-';
      res.push(arr.join(''));
      // 撤销选择
      arr[i] = '+';
      arr[i + 1] = '+';
    }
  }
  return res;
};

