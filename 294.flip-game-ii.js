/*
 * @lc app=leetcode id=294 lang=javascript
 *
 * [294] Flip Game II
 */
/**
 * @param {string} s
 * @return {boolean}
 */
var canWin = function (s) {
  if (s == null || s.length < 2) {
    return false;
  }
  var winMap = {};
  return helper(s, winMap);
}

var helper = function (s, winMap) {
  if (winMap.hasOwnProperty(s)) {
    return winMap[s];
  }
  for (var i = 0; i < s.length - 1; i++) {
    if (s.startsWith("++", i)) {
      var t = s.substring(0, i) + "--" + s.substring(i + 2);
      if (!helper(t, winMap)) {
        winMap[s] = true;
        return true;
      }
    }
  }
  winMap[s] = false;
  console.log(winMap)
  return false;
}

canWin("++++");
