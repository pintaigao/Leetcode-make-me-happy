/*
 * @lc app=leetcode id=246 lang=javascript
 *
 * [246] Strobogrammatic Number
 */

// @lc code=start
/**
 * @param {string} num
 * @return {boolean}
 */
var isStrobogrammatic = function (num) {
  // Note that using a String here and appending to it would be
  // poor programming practice.
  let rotatedStringBuilder = "";
  // Remember that we want to loop backwards through the string
  for (let i = num.length - 1; i >= 0; i--) {
    let c = num[i];
    if (c == "0" || c == "1" || c == "8") {
      rotatedStringBuilder += c;
    } else if (c == "6") {
      rotatedStringBuilder += "9";
    } else if (c == "9") {
      rotatedStringBuilder += "6";
    } else {
      // This must be an invalid digit.
      return false;
    }
  }
  return num === rotatedStringBuilder;
};
// @lc code=end
