/*
 * @lc app=leetcode id=159 lang=javascript
 *
 * [159] Longest Substring with At Most Two Distinct Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

// Approach 1: Sliding Window O(n)，O(1)
var lengthOfLongestSubstringTwoDistinct = function (s) {
  let n = s.length;
  if (n < 3) return n;

  // sliding window left and right pointers
  let left = 0;
  let right = 0;
  // hashmap character -> its rightmost position
  // in the sliding window
  let hashmap = {};
  let max_len = 2;

  while (right < n) {
    // when the slidewindow contains less than 3 characters
    hashmap[s[right]] = right;
    right += 1;

    console.log(hashmap);

    // slidewindow contains 3 characters
    if (Object.keys(hashmap).length === 3) {
      // delete the leftmost character
      let hashmapValues = Object.values(hashmap);
      let del_idx = Math.min(...hashmapValues);

      delete hashmap[s[del_idx]];
      // move left pointer of the slidewindow
      left = del_idx + 1;
    }

    max_len = Math.max(max_len, right - left);
  }
  return max_len;
};

lengthOfLongestSubstringTwoDistinct("ccaabbb");
// @lc code=end
