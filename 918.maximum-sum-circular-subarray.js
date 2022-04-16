/*
 * @lc app=leetcode id=918 lang=javascript
 *
 * [918] Maximum Sum Circular Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// Brute Force 方法
var maxSubarraySumCircular = function (A) {
  let maxSubArraySum = function (nums) {
    let [res, curRes] = [nums[0], nums[0]];
    for (let i = 1; i < nums.length; i++) {
      // curRes is the max subarray ending with i
      curRes = Math.max(curRes + nums[i], nums[i]);
      res = Math.max(res, curRes);
    }
    return res;
  };

  let res = maxSubArraySum(A);

  for (let i = 0; i < A.length - 1; i++) {
    // 把A的头放入A的尾部
    A.push(A.shift());
    res = Math.max(res, maxSubArraySum(A));
  }
  return res;
};

// Max is(the max subarray sum, the total sum - the min subarray sum), O(N), O(1)
let maxSubarraySumCircular2 = function (A) {
  let [total, maxSum, curMax, minSum, curMin] = [0, A[0], 0, A[0], 0];
  for (let a of A) {
    // 和 和 现在这个位置的值， 哪个大
    curMax = Math.max(curMax + a, a);
    // 最大的和
    maxSum = Math.max(maxSum, curMax);
    // 和 和 现在这个位置的值， 哪个小
    curMin = Math.min(curMin + a, a);
    // 最小的和
    minSum = Math.min(minSum, curMin);
    // 总和
    total += a;
  }
  return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum;
};

// @lc code=end
