/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  let res = "";
  palindrome = function (l, r) {
    // 防止索引越界
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      // 向两边展开
      l--;
      r++;
    }
    // 此时 s[l+1..r-1] 就是最长回文串
    return s.substring(l + 1, r);
  };
  for (let i = 0; i < s.length; i++) {
    // 以 s[i] 为中心的最长回文子串
    // 以 s[i] 和 s[i+1] 为中心的最长回文子串
    let s1 = palindrome(i, i), s2 = palindrome(i, i + 1);
    // res = longest(res, s1, s2)
    res = res.length > s1.length ? res : s1;
    res = res.length > s2.length ? res : s2;
  }
  return res;
};

// @lc code=end
