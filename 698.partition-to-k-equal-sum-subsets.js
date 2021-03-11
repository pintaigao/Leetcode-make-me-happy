/*
 * @lc app=leetcode id=698 lang=javascript
 *
 * [698] Partition to K Equal Sum Subsets
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function (nums, k) {
  let visited = new Array(nums.length).fill(0);
  let sum = nums.reduce((a, b) => a + b);
  if (k <= 0 || sum % k != 0) return false;

  let target = parseInt(sum / k);

  let canPartition = function (start_index, k, cur_sum) {
    if (k == 1) return true;
    if (cur_sum == target) {
      return canPartition(0, k - 1, 0, 0);
    }

    for (let i = start_index; i < nums.length; i++) {
      if (visited[i] == 0) {
        visited[i] = 1;
        if (canPartition(i + 1, k, cur_sum + nums[i])) {
          return true;
        }
        visited[i] = 0;
      }
    }
    return false;
  };

  return canPartition(0, k, 0);
};

// canPartitionKSubsets([4, 3, 2, 3, 5, 2, 1], 4);
// @lc code=end
