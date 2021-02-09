/*
 * @lc app=leetcode id=1239 lang=javascript
 *
 * [1239] Maximum Length of a Concatenated String with Unique Characters
 */

// @lc code=start
/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
  // isUnique的做法：就是【26】，碰到的就true，再碰一次就return false
  let isUnique = function (str) {
    if (str.length > 26) return false;
    let used = new Array(26).fill(false);
    let arr = str.split();
    for (let ch of arr) {
      if (used[ch.charCodeAt(0) - "a".charCodeAt(0)]) {
        return false;
      } else {
        used[ch.charCodeAt(0) - "a".charCodeAt(0)] = true;
      }
    }
    return true;
  };

  let res = [];
  res.push("");
  for (let str of arr) {
    if (!isUnique(str)) continue;
    let resList = [];
    for (let candidate of res) {
      let temp = candidate + str;
      if (isUnique(temp)) resList.push(temp);
    }
    res = [...res, ...resList];
  }
  let ans = 0;
  for (let str of res) ans = Math.max(ans, str.length);
  return ans;
};

maxLength(["cha", "r", "act", "ers"]);
// @lc code=end
