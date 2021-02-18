/*
 * @lc app=leetcode id=186 lang=javascript
 *
 * [186] Reverse Words in a String II
 */
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */

// Approach 1: Reverse the Whole String and Then Reverse Each Word O(n) O(1)
var reverseWords = function (str) {
  let reverse = function (s, left, right) {
    while (left < right) {
      let tmp = s[left];
      s[left++] = s[right];
      s[right--] = tmp;
    }
  };

  let reverseEachWord = function (s) {
    let n = s.length;
    let start = 0,
      end = 0;

    while (start < n) {
      // go to the end of the word
      while (end < n && s[end] != " ") end += 1;
      // reverse the word
      reverse(s, start, end - 1);
      // move to the next word
      start = end + 1;
      end += 1;
    }
  };

  // reverse the whole string
  reverse(str, 0, str.length - 1);

  // reverse each word
  reverseEachWord(str);
};
