/*
 * @lc app=leetcode id=139 lang=javascript
 *
 * [139] Word Break
 */
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
const wordBreak = function (s, wordDict) {
  const checked = new Set();
  const queue = [""];
  while (queue.length) {
    const base = queue.shift();
    console.log("base is: " + base);
    for (let possibleNextWord of wordDict) {
      const possibleStr = base + possibleNextWord;
      console.log("possibleStr is: " + possibleStr);
      if (possibleStr === s) return true;
      if (s.indexOf(possibleStr) === 0 && !checked.has(possibleStr)) {
        checked.add(possibleStr);
        queue.push(possibleStr);
      }
    }
    console.log("After check every word the queue is: " + queue);
    console.log("");
  }
  return false;
};

// 2. DP 的方法
var wordBreak = function (s, wordDict) {
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordDict.includes(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
};
