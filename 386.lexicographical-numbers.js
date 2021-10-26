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
var lexicalOrder = function (n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(i + 1);
  }
  return result.sort();
};

// 常规的做法 DFS
let lexicalOrder = function (n) {
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

// 不用dfs的做法 一般般
let lexicalOrder = function (n) {
  let list = [];
  let curr = 1;
  for (let i = 1; i <= n; i++) {
    list.push(curr);
    if (curr * 10 <= n) {
      curr *= 10;
    } else if (curr % 10 != 9 && curr + 1 <= n) {
      curr++;
    } else {
      while ((curr / 10) % 10 == 9) {
        curr /= 10;
      }
      curr = curr / 10 + 1;
    }
  }
  return list;
};
