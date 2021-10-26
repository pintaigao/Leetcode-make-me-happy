/*
 * @lc app=leetcode id=198 lang=javascript
 *
 * [198] House Robber
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // if length 0 or 1
  if (nums.length <= 1) return nums.length == 0 ? 0 : nums[0];

  let dp = [];
  dp[0] = nums[0]; // for house 0, we can only rob house 0
  // for house 1, we can rub just house 1 or just house 0, we take the max
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++)
    // at house i, we could rob it or not rub it
    // if we rob house i (current house), we know that
    // our previously robbed house would be i - 2 since
    // we can not rob adjacient house
    // if we do not rob house i (current house), we know that
    // our previously robbed house would be i - 1 since the same
    // reason above

    // so the current accumulated sum at house i will be the max
    // of the two cases described above except if we rob, make sure
    // we add the money in current house first before comparing
    // so,
    // if rob, the money will become: dp[i-2] + nums[i]
    // if not rob, the money will besome: dp[i-1]
    // dp[i]: robbed so far
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);

  return dp[dp.length - 1];
};
// @lc code=end
