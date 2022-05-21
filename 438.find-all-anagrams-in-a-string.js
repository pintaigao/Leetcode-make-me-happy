/*
 * @lc app=leetcode id=438 lang=javascript
 *
 * [438] Find All Anagrams in a String
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */

/* Solution 1:划窗 */
var findAnagrams = function (s, p) {
  let [ns, np] = [s.length, p.length];
  if (ns < np) return [];

  let pCount = new Array(26).fill(0);
  let sCount = new Array(26).fill(0);
  // build reference array using string p
  for (let ch of p) {
    pCount[ch.charCodeAt() - "a".charCodeAt()] += 1;
  }

  let result = [];
  // sliding window on the string s
  for (let i = 0; i < ns; ++i) {
    // add one more letter
    // on the right side of the window
    sCount[s.charCodeAt(i) - "a".charCodeAt()]++;
    // remove one letter
    // from the left side of the window
    if (i >= np) {
      // 划窗，只保持窗口大小为np
      sCount[s.charCodeAt(i - np) - "a".charCodeAt()]--;
    }
    // compare array in the sliding window
    // with the reference array
    if (pCount.join("") === sCount.join("")) {
      result.push(i - np + 1);
    }
  }

  console.log(result);
  return result;
};
// @lc code=end
