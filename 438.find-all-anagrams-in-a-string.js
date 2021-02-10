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

// Slide Window + Array O(Ns + Np) 和 O(1) 因为26个字母是固定的
var findAnagrams = function (s, p) {
  let ns = s.length,
    np = p.length;
  if (ns < np) return [];

  let pCount = new Array(26).fill(0);
  let sCount = new Array(26).fill(0);
  // build reference array using string p
  for (let ch of p.split("")) {
    pCount[ch.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  let output = [];
  // sliding window on the string s
  for (let i = 0; i < ns; ++i) {
    // add one more letter
    // on the right side of the window
    sCount[s.charCodeAt(i) - "a".charCodeAt(0)]++;
    // remove one letter
    // from the left side of the window
    if (i >= np) {
      sCount[s.charCodeAt(i - np) - "a".charCodeAt(0)]--;
    }
    // compare array in the sliding window
    // with the reference array
    if (pCount.join("") === sCount.join("")) {
      output.push(i - np + 1);
    }
  }

  console.log(output);
  return output;
};

findAnagrams("cbaebabacd", "abc");

// @lc code=end
