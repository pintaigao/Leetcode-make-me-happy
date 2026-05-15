/*
 * @lc app=leetcode id=386 lang=javascript
 *
 * [386] Lexicographical Numbers
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[]}
 */

/* Solution 1：DFS */
var lexicalOrder = function (n) {
  let res = [];

  let dfs = function (cur) {
    if (cur > n) return;
    else {
      res.push(cur);
      for (let i = 0; i < 10; ++i) {
        if (10 * cur + i > n) return;
        dfs(10 * cur + i);
      }
    }
  };

  for (let i = 1; i < 10; ++i) {
    dfs(i);
  }

  return res;
};

/* Solution 2: Math */
let lexicalOrder2 = function (n) {
  const ret = [];
  let number = 1;
  for (let i = 0; i < n; i++) {
    ret.push(number);
    if (number * 10 <= n) {
      number *= 10;
    } else {
      while (number % 10 === 9 || number + 1 > n) {
        number = Math.floor(number / 10);
      }
      number++;
    }
  }
  return ret;
};
// @lc code=end

// 练习
var lexicalOrder10 = function (n) {
  let res = [], path = [];

  function traveler() {
    console.log(path);
    if (path[0] == '0') {
      return;
    }

    if (path.join('') !== '' && Number(path.join('')) <= n) {
      res.push(Number(path.join('')));
    }

    if (Number(path.join('')) > n) {
      return;
    }

    for (let i = 0; i < 10; i++) {
      path.push(i + '');
      traveler();
      path.pop();
    }
  }

  traveler();

  console.log(res);
}


lexicalOrder10(13);