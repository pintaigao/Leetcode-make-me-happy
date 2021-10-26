/*
 * @lc app=leetcode id=605 lang=javascript
 *
 * [605] Can Place Flowers
 */

// @lc code=start
/**
 * @param {number[]} flowerbed
 * @param {number} n
 * @return {boolean}
 */
// Approach #1 Single Scan Math的方法 O(n) O(1)
var canPlaceFlowers = function (flowerbed, n) {
  let i = 0,
    count = 0;
  while (i < flowerbed.length) {
    if (
      flowerbed[i] == 0 &&
      (i == 0 || flowerbed[i - 1] != 1) &&
      (i == flowerbed.length - 1 || flowerbed[i + 1] != 1)
    ) {
      flowerbed[i] = 1;
      count += 1;
    }
    i += 1;
  }
  return count >= n;
};
// @lc code=end
