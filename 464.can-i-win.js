/*
 * @lc app=leetcode id=464 lang=javascript
 *
 * [464] Can I Win
 */

// @lc code=start
/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
var canIWin = function (maxChoosableInteger, desiredTotal) {
  let canIWinHelper = function (total, state, hashMap) {
    let curr = state.join(",");
    if (hashMap.hasOwnProperty(curr)) return hashMap[curr];
    for (let i = 0; i < state.length; i++) {
      if (state[i] == 0) {
        state[i] = 1;
        if (total <= i + 1 || !canIWinHelper(total - (i + 1), state, hashMap)) {
          hashMap[curr] = true;
          state[i] = 0;
          return true;
        }
        state[i] = 0;
      }
    }
    hashMap[curr] = false;
    return false;
  };

  if (desiredTotal <= 0) return true;
  if ((maxChoosableInteger * (maxChoosableInteger + 1)) / 2 < desiredTotal)
    return false;
  return canIWinHelper(
    desiredTotal,
    new Array(maxChoosableInteger).fill(0),
    {}
  );
};
// @lc code=end
