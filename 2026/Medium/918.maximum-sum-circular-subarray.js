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

    curMin = Math.min(curMin + a, a);
    // 最小的和
    minSum = Math.min(minSum, curMin);
    // 总和
    total += a;
  }
  return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum;
};

// @lc code=end


// 练习
let maxSubarraySumCircular10 = function (A) {
  let newA = [...A, ...A], result = Array.from({ length: newA.length }).fill(0);
  console.log(result);

  for (let i = 0; i < newA.length; i++) {
    if (i === 0) {
      result[i] = Math.max(newA[i], 0)
    } else {
      let sum = Math.max(result[i - 1] + newA[i], 0)
      result[i] = sum;
    }
  }

  console.log(result);

  return Math.max(result);
}

maxSubarraySumCircular10([5, -3, 5])

var maxSubarraySumCircular = function (nums) {
  // 模拟环状的 nums 数组
  const n = nums.length, preSum = new Array(2 * n + 1).fill(0);

  // 计算环状 nums 的前缀和
  for (let i = 1; i < preSum.length; i++) {
    preSum[i] = preSum[i - 1] + nums[(i - 1) % n];
  }
  // 记录答案
  let maxSum = -Infinity;
  // 维护一个滑动窗口，以便根据窗口中的最小值计算最大子数组和
  let window = new MonotonicQueue();
  window.push(0);
  for (let i = 1; i < preSum.length; i++) {
    maxSum = Math.max(maxSum, preSum[i] - window.min());
    // 维护窗口的大小为 nums 数组的大小
    if (window.size() === n) {
      window.pop();
    }
    window.push(preSum[i]);
  }

  return maxSum;
};
