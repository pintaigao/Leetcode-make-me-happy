/*
 * @lc app=leetcode id=291 lang=javascript
 *
 * [291] Word Pattern II
 */

// @lc code=start
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
// let map = new Map();
// var wordPatternMatch = function (pattern, str) {

//   if (pattern.length == 0) {
//     return str.length == 0;
//   }

//   if (map.has(pattern[0])) {
//     let value = map.get(pattern[0]);
//     if (value.length > str.length || str.substring(0, value.length) !== value) return false;
//     if (wordPatternMatch(pattern.substring(1), str.substring(value.length))) return true;
//   } else {
//     for (let i = 1; i <= str.length; i++) {
//       if (Array.from(map.values()).includes(str.substring(0, i))) continue;
//       map.set(pattern[0], str.substring(0, i));
//       if (wordPatternMatch(pattern.substring(1), str.substring(i))) {
//         return true;
//       }
//       map.delete(pattern[0]);
//     }
//   }
//   return false;
// };

var wordPatternMatch = function (pattern, str) {
  if (pattern.length == 0 && str.length == 0) return true;
  if (pattern.length == 0 || str.length == 0) return false;
  var map = new Map();
  var set = new Set();
  return DFShelper(pattern, str, 0, 0, map, set);
};

function DFShelper(pattern, str, i, j, map, set) {
  if (i == pattern.length && j == str.length) return true;

  if (i >= pattern.length || j >= str.length) return false;

  var c = pattern.charAt(i);

  for (let k = j + 1; k <= str.length; k++) {
    var sub = str.substring(j, k);

    if (!map.has(c) && !set.has(sub)) {
      map.set(c, sub);
      set.add(sub);
      if (DFShelper(pattern, str, i + 1, k, map, set)) {
        return true;
      }
      map.delete(c);
      set.delete(sub);
    } else if (map.has(c) && (map.get(c) == sub)) {
      if (DFShelper(pattern, str, i + 1, k, map, set)) return true;
    }
  }
  return false;
}

wordPatternMatch("abab", "redblueredblue");
// @lc code=end

