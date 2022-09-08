/*
 * @lc app=leetcode id=131 lang=javascript
 *
 * [131] Palindrome Partitioning
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */

/* 1. 回溯 + 动态规划预处理*/
var partition = function (s) {
  const dfs = (i) => {
    if (i === s.length) {
      ret.push(ans.slice());
      return;
    }
    for (let j = i; j < s.length; ++j) {
      if (f[i][j]) {
        ans.push(s.slice(i, j + 1));
        dfs(j + 1);
        ans.pop();
      }
    }
  };

  const f = new Array(s.length).fill(0).map(() => new Array(s.length).fill(true));
  let [ret, ans] = [[], []];

  for (let i = s.length - 1; i >= 0; --i) {
    for (let j = i + 1; j < s.length; ++j) {
      f[i][j] = s[i] === s[j] && f[i + 1][j - 1];
    }
  }

  dfs(0);
  return ret;
};

/* 2.记忆化搜索 */
let partition = function (s) {
  const dfs = (i) => {
    if (i === s.length) {
      ret.push(ans.slice());
      return;
    }
    for (let j = i; j < s.length; ++j) {
      if (isPalindrome(i, j) === 1) {
        ans.push(s.slice(i, j + 1));
        dfs(j + 1);
        ans.pop();
      }
    }
  };

  // 记忆化搜索中，f[i][j] = 0 表示未搜索，1 表示是回文串，-1 表示不是回文串
  const isPalindrome = (i, j) => {
    if (f[i][j] !== 0) {
      return f[i][j];
    }
    if (i >= j) {
      f[i][j] = 1;
    } else if (s[i] === s[j]) {
      f[i][j] = isPalindrome(i + 1, j - 1);
    } else {
      f[i][j] = -1;
    }
    return f[i][j];
  };

  const [ret, ans] = [[], []];
  const f = new Array(s.length).fill(0).map(() => new Array(s.length).fill(0));

  dfs(0);
  return ret;
};

partition("aab");
// @lc code=end
