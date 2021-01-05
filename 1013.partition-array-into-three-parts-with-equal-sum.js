/*
 * @lc app=leetcode id=1013 lang=javascript
 *
 * [1013] Partition Array Into Three Parts With Equal Sum
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {boolean}
 */
var canThreePartsEqualSum = function (A) {
  let count = 0;
  let currentSum = 0;
  const sum =
    A.reduce((accumulator, current) => {
      return accumulator + current;
    }) / 3;

  for (const number of A) {
    currentSum += number;

    if (currentSum === sum) {
      count++;
      currentSum = 0;
    }
  }

  return count >= 3;
};
// @lc code=end
