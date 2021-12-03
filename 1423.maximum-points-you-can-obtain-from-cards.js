/*
 * @lc app=leetcode id=1423 lang=javascript
 *
 * [1423] Maximum Points You Can Obtain from Cards
 */

// @lc code=start
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */

// 1.Easy Sliding Window O(n): Find minimum subarray
var maxScore = function (cardPoints, k) {
  let n = cardPoints.length - k;
  let total = 0;
  let min = Number.MAX_VALUE;
  let cur = 0;
  let l = 0;
  let r = 0;
  4;
  while (r < cardPoints.length) {
    total += cardPoints[r];
    cur += cardPoints[r];
    if (r - l + 1 == n) {
      min = Math.min(min, cur);
      cur -= cardPoints[l];
      l += 1;
    }
    r += 1;
  }

  return total - (min == Number.MAX_VALUE ? 0 : min);
};

// 2.跟上面的相似
let maxScore = function (cardPoints, k) {
  let sum = 0; // window: start = 0; end = k;

  // 前k个的sum
  for (let i = 0; i < k; i++) {
    sum += cardPoints[i];
  }
  let newSum = sum; // window: start = 0; end = k;
  for (let end = k - 1; end >= 0; end--) {
    //sliding window left => start = -1
    newSum -= cardPoints[end];
    newSum += cardPoints[cardPoints.length - (k - end)];
    sum = Math.max(sum, newSum);
  }
  return sum;
};

maxScore([1, 79, 80, 1, 1, 1, 200, 1], 3);

// @lc code=end
