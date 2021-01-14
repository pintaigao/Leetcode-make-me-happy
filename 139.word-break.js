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
      if (possibleStr === s) return true;
      if (s.indexOf(possibleStr) === 0 && !checked.has(possibleStr)) {
        checked.add(possibleStr);
        queue.push(possibleStr);
      }
    }
  }
  return false;
};

console.log(wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]));
