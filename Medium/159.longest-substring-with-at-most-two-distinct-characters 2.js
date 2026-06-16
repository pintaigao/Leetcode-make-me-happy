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
// map 反应的是 key：字母 value：字母的最右的 index
var lengthOfLongestSubstringTwoDistinct = function (s) {
  let n = s.length;
  if (n < 3) return n;

  // sliding window left and right pointers
  // hashmap character -> its rightmost position
  // in the sliding window
  let left = 0, right = 0, hashmap = {}, max_len = 2;

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


/**
 * @param {string} s
 * @return {number}
 */
// map 反应的是 key：字母，value：字母出现的次数
var lengthOfLongestSubstringTwoDistinct = function (s) {
  let n = s.length, map = new Map([[s[0], 1]]), ans = 1, start = 0, end = 1;
  while (end < n) {
    let x = s[end];
    map.set(x, (map.get(x) ?? 0) + 1);

    while (map.size > 2) {
      let count = map.get(s[start]);
      if (count - 1 === 0) map.delete(s[start]);
      else map.set(s[start], count - 1);
      start += 1;
    }
    ans = Math.max(ans, end - start + 1);
    end += 1;
  }
  return ans;
};