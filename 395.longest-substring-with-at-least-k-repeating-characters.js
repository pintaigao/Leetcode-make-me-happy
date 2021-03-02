/*
 * @lc app=leetcode id=395 lang=javascript
 *
 * [395] Longest Substring with At Least K Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

// Approach 3: Two Pointer
var longestSubstring = function (s, k) {
  let counts = new Array(26).fill(0);
  let h,
    i,
    j,
    idx,
    max = 0,
    unique,
    noLessThanK;

  for (h = 1; h <= 26; h++) {
    i = 0;
    j = 0;
    unique = 0;
    noLessThanK = 0;
    while (j < s.length) {
      if (unique <= h) {
        idx = s[j].charCodeAt(0) - "a".charCodeAt(0);
        if (counts[idx] == 0) unique += 1;
        counts[idx] += 1;
        if (counts[idx] == k) noLessThanK += 1;
        j += 1;
      } else {
        idx = s[i].charCodeAt(0) - "a".charCodeAt(0);
        if (counts[idx] == k) noLessThanK -= 1;
        counts[idx] -= 1;
        if (counts[idx] == 0) unique -= 1;
        i += 1;
      }
      if (unique == h && unique == noLessThanK) max = Math.max(j - i, max);
    }
  }

  return max;
};

// 另外一种方法
var longestSubstring2 = function (s, k) {
  if (s == null || s.length == 0) return 0;
  let chars = new Array(26).fill(0);
  // record the frequency of each character
  for (let i = 0; i < s.length; i += 1) {
    chars[s.charCodeAt(i) - "a".charCodeAt(0)] += 1;
  }

  console.log(chars);
  let flag = true;

  // 如果没有满足的，返回
  for (let i = 0; i < chars.length; i += 1) {
    if (chars[i] < k && chars[i] > 0) flag = false;
  }
  // return the length of string if this string is a valid string
  if (flag == true) return s.length;
  let result = 0;
  let start = 0;
  let cur = 0;
  // otherwise we use all the infrequent elements as splits
  while (cur < s.length) {
    if (chars[s.charCodeAt(cur) - "a".charCodeAt(0)] < k) {
      result = Math.max(result, longestSubstring2(s.substring(start, cur), k));
      start = cur + 1;
    }
    cur += 1;
  }
  result = Math.max(result, longestSubstring2(s.substring(start), k));
  return result;
};

//  Javascript的方法
let longestSubstring3 = function (s, k) {
  const mp = {};

  for (let letter of s) {
    mp[letter] = mp[letter] + 1 || 1;
  }

  console.log(mp);

  let result = 0;
  for (let prop in mp) {
    if (mp[prop] < k) {
      // 用没有够k的那个字母分开两边两个substring
      let spl = s.split(prop);
      console.log(spl);
      // 然后再看看这些个substring符不符合要求
      for (let word of spl) {
        if (word.length == 0) {
          continue;
        }
        result = Math.max(result, longestSubstring3(word, k));
      }
      return result;
    }
  }
  return s.length;
};

console.log(longestSubstring3("ababbcabbbajjjkkkssdcssssi", 3));

// @lc code=end
