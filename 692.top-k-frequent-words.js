/*
 * @lc app=leetcode id=692 lang=javascript
 *
 * [692] Top K Frequent Words
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
/* Fastest Solution O(l*n+l*mlogm) */
var topKFrequent = function (words, k) {
  let map = {};
  for (word of words) {
    map[word] = map[word] + 1 || 1;
  }

  let result = Object.keys(map).sort((a, b) => {
    let countCompare = map[b] - map[a];
    if (countCompare !== 0) return countCompare;
    else return a > b ? 1 : -1; // 如果出现的次数是相同的话，按字典顺序排序a-b>0, 则1大于0，所以返回1，否则返回-1
  });

  return result.slice(0, k);
};
// @lc code=end
