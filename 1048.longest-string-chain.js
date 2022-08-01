/*
 * @lc app=leetcode id=1048 lang=javascript
 *
 * [1048] Longest String Chain
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {number}
 */

/* 动态规划 */
// 每loop到一个word，都要考虑下它是不是它之后的word的前身
var longestStrChain = function (words) {
  words.sort((a, b) => a.length - b.length);
  // dp[i]表示从words[0]到words[i]最长的词链长度
  let dp = new Array(words.length).fill(1);
  let res = 1; //

  /**
   * 判断a是否是b的前身 是返回true 如 "bda" 是"bdca"的前身
   */
  let isPredecessor = (a, b) => {
    let [i, j] = [0, 0];
    if (a.length + 1 != b.length) return false;
    while (i < a.length && j < b.length) {
      if (a[i] == b[j]) i++;
      j++;
    }
    // 理想的情况下i会走到a的最后，即i==a.length
    return i == a.length;
  };

  for (let i = 0; i < words.length; i++) {
    let a = words[i];
    // 看看a是不是后面的word的前身
    for (let j = i + 1; j < words.length; j++) {
      let b = words[j];
      // a是不是b的前身，是：算是b的个数（即1），dp[i] + 1
      if (isPredecessor(a, b)) {
        dp[j] = Math.max(dp[j], dp[i] + 1);
        res = Math.max(dp[j], res);
      }
    }
  }

  return res;
};

/* DFS */
var longestStrChain = function (words) {
  let min = 0,
    max = 16; //最小字符长度，最大字符长度
  //K为字符长度，Set为该字符长度的word集合
  let map = {};
  for (let word of words) {
    map[word.length] = map[word.length].add(word) || new Set([word]);
    min = Math.min(min, word.length);
    max = Math.max(max, word.length);
  }

  /**
   * @param map
   * @param len 当前字符的长度
   * @param levelStr 当前字符
   */
  let findNext = (len, levelStr) => {
    res = Math.max(res, levelStr.length + 1 - len); //记录结果集
    let curSet = map[levelStr.length + 1]; //
    if (!curSet) return; //退出条件
    for (let it of curSet) {
      if (isPredecessor(levelStr, it)) {
        findNext(len, it);
        curSet.remove(it);
      }
    }
  };

  for (let len = min; len <= max; len++) {
    let curSet = map[len];
    if (curSet == null) continue; //当set没有值时，无需遍历
    if (max + 1 - len <= res) continue; //最大长度+1-当前的长度<=res，res更加符合题意
    for (let cur of curSet) {
      findNext(len, cur);
    }
  }
  return res;
};

/* Map记录最长长度的做法 */
let longestStrChain = function (words) {
  const cnt = new Array(16).fill(new Set());
  words.forEach((word) => cnt[word.length - 1].add(word));

  const map = new Map();
  let ans = 1;

  for (let i = 15; i > 0; i--) {
    if (!cnt[i - 1].size) continue;

    for (const word of cnt[i]) {
      const wVal = map.get(word) ?? 1;

      for (let j = 0; j < word.length; j++) {
        const hash = word.slice(0, j) + word.slice(j + 1);
        if (cnt[i - 1].has(hash) && wVal >= (map.get(hash) ?? 1)) {
          map.set(hash, wVal + 1);
          ans = Math.max(ans, wVal + 1);
        }
      }
    }
  }

  return ans;
};

/* Sort + Map记录最长长度的做法 */
var longestStrChain = function (words) {
  words.sort((a, b) => a.length - b.length);
  const M = new Map();
  let res = 1;
  for (let s of words) {
    if (M.has(s)) continue; // 重复
    M.set(s, 1); // s所代表的最长的词链的长度先假设为1（每个单词都可以代表最长的词链为1）
    // loop s中的每一个字母
    for (let i = 0; i < s.length; i++) {
      if (i > 0 && s[i] === s[i - 1]) continue; // 重复
      let t = s.substring(0, i) + s.substring(i + 1); // s舍弃当前i这个位置的字母，所组成的新的单词
      // 如果map中有t，而且t所记录的最长的词链的长度要大于等于s所记录的，则更新s的最长的词链的长度为 get t + 1
      if (M.has(t) && M.get(t) >= M.get(s)) {
        M.set(s, M.get(t) + 1);
      }
    }
    res = Math.max(res, M.get(s));
  }
  return res;
};

// @lc code=end
