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
  // dp[i]表示从words[0]到words[i]最长的词链长度,
  let dp = new Array(words.length).fill(1), res = 1;

  /**
   * 判断a是否是b的前身 是返回true 如 "bda" 是"bdca"的前身
   * 此处
   */
  let isPredecessor = (a, b) => {
    let [i, j] = [0, 0];
    // b的长度一定是 a+1
    if (a.length + 1 != b.length) return false;
    while (i < a.length && j < b.length) {
      if (a[i] == b[j]) i++;
      j++;
    }
    // 理想的情况下i会走到a的最后，即i==a.length
    return i == a.length;
  };

  for (let i = 0; i < words.length; i++) {
    // 看看a是不是后面的word的前身
    for (let j = i + 1; j < words.length; j++) {
      // a是不是b的前身，是：算是b的个数（即1），dp[i] + 1
      if (isPredecessor(words[i], words[j])) {
        dp[j] = Math.max(dp[j], dp[i] + 1);
        res = Math.max(dp[j], res);
      }
    }
  }

  return res;
};

/* Map记录最长长度的做法 */
let longestStrChain = function (words) {
  let cnt = new Array(16).fill(new Set()), map = new Map(), ans = 1;
  words.forEach((word) => cnt[word.length - 1].add(word));

  for (let i = 15; i > 0; i--) {
    if (!cnt[i - 1].size) continue;

    for (const word of cnt[i]) {
      // 这一步表示从后往前，到这个 word这个位置上，最长字符串链的长度是多少
      const wVal = map.has(word) ? map.get(word) : 1;
      for (let j = 0; j < word.length; j++) {
        // 这个 word，通过删除每一个位置上的字符获得得到一个新的 word(hash),如果上一个长度有这个 word，而且个数大于等于 1
        // 组成一个新的 word
        const hash = word.slice(0, j) + word.slice(j + 1);

        if (cnt[i - 1].has(hash)) {
          if (!map.has(hash) || map.get(hash) <= wVal) {
            // 如果 map.get(hash) > wVal 则就不走从 word 到 这个 hash的这条路（其他的 word 到这个 hash 有更长的最长字符串链）
            // 如果前一个长度有，说明接的上，则要看前一个长度，到他那目前最长字符串链的值是多少
            map.set(hash, wVal + 1);
          }
          ans = Math.max(ans, wVal + 1);
        }
      }
    }
  }
  return ans;
};

/* Map作为 DP的做法（最快）*/
var longestStrChain = function (words) {
  // 1. 按长度排序
  words.sort((a, b) => a.length - b.length);
  const dp = new Map(), res = 1;
  for (let word of words) {
    let max = 1;
    // 2. 枚举删除一个字符
    for (let i = 0; i < word.length; i++) {
      let prev = word.slice(0, i) + word.slice(i + 1);

      if (dp.has(prev)) {
        max = Math.max(max, dp.get(prev) + 1);
      }
    }

    // 这个 word 到目前为止最长字符串链的长度
    dp.set(word, max);
    res = Math.max(res, max);
  }

  return res;
};

/* DFS */
var longestStrChain = function (words) {
  //K为字符长度，Set为该字符长度的word集合
  let min = 0, max = 16, map = {};
  for (let word of words) {
    map[word.length] = map[word.length].add(word) || new Set([word]);
    min = Math.min(min, word.length);
    max = Math.max(max, word.length);
  }

  // len：当前字符的长度，levelStr 当前字符
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