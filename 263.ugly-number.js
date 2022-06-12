/*
 * @lc app=leetcode id=263 lang=javascript
 *
 * [263] Ugly Number
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isUgly = function (num) {
  if (num <= 0) return false;
  while (parseInt(num / 2) === num / 2) {
    num /= 2;
  } // using the fact that
  while (parseInt(num / 3) === num / 3) {
    num /= 3;
  } // multiplication is commutative,
  while (parseInt(num / 5) === num / 5) {
    num /= 5;
  } // hence the order doesn't matter
  return num === 1;
};

/* 回溯的方法 */
var isUgly = function (num) {
  if (num <= 0) return false;
  if (num === 1 || num === 2 || num === 3 || num === 5) return true;
  if (num % 2 === 0) return isUgly(num / 2);
  else if (num % 3 === 0) return isUgly(num / 3);
  else if (num % 5 === 0) return isUgly(num / 5);
  else return false;
};
// @lc code=end
