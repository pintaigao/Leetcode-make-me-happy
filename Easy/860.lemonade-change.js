/*
 * @lc app=leetcode id=860 lang=javascript
 *
 * [860] Lemonade Change
 */

// @lc code=start
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  let five = 0,
    ten = 0;
  for (let i of bills) {
    if (i == 5) five++;
    else if (i == 10) {
      five--;
      ten++;
    } else if (i == 20) {
      if (ten > 0) {
        ten--;
        five--;
      } else five -= 3;
    }
    if (five < 0) return false;
  }
  return true;
};
// @lc code=end
