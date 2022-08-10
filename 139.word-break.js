/*
 * @lc app=leetcode id=139 lang=javascript
 *
 * [139] Word Break
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 *
 */

/* DFS 1：*/
var wordBreak = function (s, wordDict) {
  const [len, wordSet] = [s.length, new Set(wordDict)];

  const canBreak = (start) => {
    // 判断从start到末尾的子串能否break
    if (start == len) {
      //指针越界，s一步步成功划分为单词，才走到越界这步，现在没有剩余子串
      return true; //返回真，结束递归
    }
    for (let i = start + 1; i <= len; i++) {
      //指针i去划分两部分，for枚举出当前所有的选项i
      const prefix = s.slice(start, i); // 切出的前缀部分
      if (wordSet.has(prefix) && canBreak(i)) {
        // 前缀部分是单词，且剩余子串能break，返回真
        return true;
      } // 如果前缀部分不是单词，就不会执行canBreak(i)。进入下一轮迭代，再切出一个前缀串，再试
    }
    return false; // 指针i怎么划分，都没有返回true，则返回false
  };

  return canBreak(0); // 递归的入口，从0到末尾的子串能否break
};

/* DFS 记忆化 */
const wordBreak = (s, wordDict) => {
  const len = s.length;
  const wordSet = new Set(wordDict);
  const memo = new Array(len);

  const canBreak = (start) => {
    if (start == len) return true;
    if (memo[start] !== undefined) return memo[start]; // memo中有，就用memo中的

    for (let i = start + 1; i <= len; i++) {
      const prefix = s.slice(start, i);
      if (wordSet.has(prefix) && canBreak(i)) {
        memo[start] = true; // 当前递归的结果存一下
        return true;
      }
    }

    memo[start] = false; // 当前递归的结果存一下
    return false;
  };
  return canBreak(0);
};

/* BFS */
const wordBreak = (s, wordDict) => {
  const wordSet = new Set(wordDict);
  const len = s.length;
  const queue = [];
  queue.push(0);

  while (queue.length) {
    const start = queue.shift(); // 考察出列的指针
    for (let i = start + 1; i <= len; i++) {
      // i指针去划分两部分
      const prefix = s.slice(start, i); // 切出前缀部分
      if (wordSet.has(prefix)) {
        // 前缀部分是单词
        if (i < len) {
          // i还没越界，还能继续划分，让它入列，作为下一层待考察的节点
          queue.push(i);
        } else {
          // i==len，指针越界，说明s串一路被切出单词，现在没有剩余子串，返回true
          return true;
        }
      } // 前缀部分不是单词，这个 i 指针不入列，继续下轮迭代，切出下一个前缀部分，再试
    }
  }
  return false; // BFS完所有节点（考察了所有划分的可能）都没返回true，则返回false
};

/* 优化后的BFS */
const wordBreak = (s, wordDict) => {
  const wordSet = new Set(wordDict);
  const len = s.length;
  const visited = new Array(len);

  const queue = [];
  queue.push(0);

  while (queue.length) {
    const start = queue.shift(); // 考察出列的指针
    if (visited[start]) continue; // 是访问过的，跳过
    visited[start] = true; // 未访问过的，记录一下

    for (let i = start + 1; i <= len; i++) {
      // 用指针i去划分两部分
      const prefix = s.slice(start, i); // 前缀部分
      if (wordSet.has(prefix)) {
        // 前缀部分是单词
        if (i < len) {
          // i还没越界，还能继续划分，让它入列，作为下一层待考察的节点
          queue.push(i);
        } else {
          // i==len，指针越界，说明s串一路被切出单词，现在没有剩余子串，不用划分，返回true
          return true;
        }
      } // 前缀部分不是单词，i指针不入列，继续下轮迭代，切出下一个前缀部分，再试
    }
  }
  return false; // BFS完所有节点（考察了所有划分的可能）都没返回true，则返回false
};

/* DP */
const wordBreak = (s, wordDict) => {
  const wordSet = new Set(wordDict);
  const len = s.length;
  const dp = new Array(len + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= len; i++) {
    for (let j = i - 1; j >= 0; j--) {
      // j去划分成两部分
      const suffix = s.slice(j, i); // 后缀部分 s[j: i-1]
      if (wordSet.has(suffix) && dp[j]) {
        // 后缀部分是单词，且左侧子串[0,j-1]的dp[j]为真
        dp[i] = true;
        break; // dp[i] = true了，i长度的子串已经可以拆成单词了，不需要j继续划分子串了
      }
    }
  }
  return dp[len];
};

// @lc code=end
