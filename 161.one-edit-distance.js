/*
 * @lc app=leetcode id=161 lang=javascript
 *
 * [161] One Edit Distance
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isOneEditDistance = function (s, t) {
  let ns = s.length;
  let nt = t.length;

  // Ensure that s is shorter than t.
  if (ns > nt) {
    return isOneEditDistance(t, s);
  }

  // The strings are NOT one edit away distance
  // if the length diff is more than 1.
  if (nt - ns > 1) return false;

  for (let i = 0; i < ns; i++)
    if (s[i] != t[i])
      if (ns == nt)
        // if strings have the same length
        return s.substring(i + 1) === t.substring(i + 1);
      // if strings have different lengths
      else return s.substring(i) === t.substring(i + 1);

  // If there is no diffs on ns distance
  // the strings are one edit away only if
  // t has one more character.
  return ns + 1 == nt;
};

isOneEditDistance("1203", "1213");
// @lc code=end
