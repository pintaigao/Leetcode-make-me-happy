/*
 * @lc app=leetcode id=567 lang=javascript
 *
 * [567] Permutation in String
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */

// Approach #3 Using Hashmap

// Approach #4 Using Array O(l1+26∗l1∗(l2−l1)) O(1)
var checkInclusion = function (s1, s2) {
  let matches = function (s1map, s2map) {
    for (let i = 0; i < 26; i++) {
      if (s1map[i] != s2map[i]) return false;
    }
    return true;
  };

  if (s1.length > s2.length) return false;
  let s1map = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++)
    s1map[s1.charCodeAt(i) - "a".charCodeAt(0)] += 1;

  for (let i = 0; i <= s2.length - s1.length; i++) {
    let s2map = new Array(26).fill(0);
    for (let j = 0; j < s1.length; j++) {
      s2map[s2.charCodeAt(i + j) - "a".charCodeAt(0)] += 1;
    }
    console.log(s1map, s2map);
    console.log();
    if (matches(s1map, s2map)) return true;
  }
  return false;
};

checkInclusion("ab", "eidbaooo");

// Approach #6 Optimized Sliding Window [Accepted]: O(l1+(l2-l1))
let checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;
  let s1map = new Array(26).fill(0);
  let s2map = new Array(26).fill(0);
  for (let i = 0; i < s1.length; i++) {
    s1map[s1.charCodeAt(i) - "a".charCodeAt(0)] += 1;
    s2map[s2.charCodeAt(i) - "a".charCodeAt(0)] += 1;
  }
  let count = 0;
  for (let i = 0; i < 26; i++) if (s1map[i] == s2map[i]) count += 1;
  for (let i = 0; i < s2.length - s1.length; i++) {
    let r = s2.charCodeAt(i + s1.length) - "a".charCodeAt(0),
      l = s2.charCodeAt(i) - "a".charCodeAt(0);
    if (count == 26) return true;
    s2map[r] += 1;
    if (s2map[r] == s1map[r]) count += 1;
    else if (s2map[r] == s1map[r] + 1) count -= 1;
    s2map[l] -= 1;
    if (s2map[l] == s1map[l]) count += 1;
    else if (s2map[l] == s1map[l] - 1) count -= 1;
  }
  return count == 26;
};

// @lc code=end
