/*
 * @lc app=leetcode id=918 lang=javascript
 *
 * [918] Maximum Sum Circular Subarray
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number}
 */

// Approach 1: Next Array both O(n) 太难懂了
var maxSubarraySumCircular = function (A) {
  let N = A.length;

  let ans = A[0],
    cur = A[0];
  for (let i = 1; i < N; ++i) {
    cur = A[i] + Math.max(cur, 0);
    ans = Math.max(ans, cur);
  }

  // ans is the answer for 1-interval subarrays.
  // Now, let's consider all 2-interval subarrays.
  // For each i, we want to know
  // the maximum of sum(A[j:]) with j >= i+2

  // rightsums[i] = A[i] + A[i+1] + ... + A[N-1]
  let rightsums = [];
  rightsums[N - 1] = A[N - 1];
  for (let i = N - 2; i >= 0; --i) {
    rightsums[i] = rightsums[i + 1] + A[i];
  }

  console.log(rightsums);

  // maxright[i] = max_{j >= i} rightsums[j]
  let maxright = [];
  maxright[N - 1] = A[N - 1];
  for (let i = N - 2; i >= 0; --i) {
    maxright[i] = Math.max(maxright[i + 1], rightsums[i]);
  }

  console.log(maxright);

  let leftsum = 0;
  for (let i = 0; i < N - 2; ++i) {
    leftsum += A[i];
    ans = Math.max(ans, leftsum + maxright[i + 2]);
  }

  return ans;
};

maxSubarraySumCircular([1, -2, 3, -2]);

// One pass solution max is(the max subarray sum, the total sum - the min subarray sum), O(N), O(1)
let maxSubarraySumCircular2 = function (A) {
  let total = 0,
    maxSum = A[0],
    curMax = 0,
    minSum = A[0],
    curMin = 0;
  for (let a of A) {
    curMax = Math.max(curMax + a, a);
    maxSum = Math.max(maxSum, curMax);
    curMin = Math.min(curMin + a, a);
    minSum = Math.min(minSum, curMin);
    total += a;
  }
  return maxSum > 0 ? Math.max(maxSum, total - minSum) : maxSum;
};

// 比较正常的brute force的方法
var maxSubarraySumCircular = function (A) {
  let maxSubArray = function (nums) {
    let [res, curRes] = [nums[0], nums[0]];
    for (let i = 1; i < nums.length; i++) {
      // curRes is the max subarray ending with i
      curRes = Math.max(curRes + nums[i], nums[i]);
      res = Math.max(res, curRes);
    }
    return res;
  };

  let res = maxSubArray(A);
  for (let i = 0; i < A.length - 1; i++) {
    A.push(A.shift());
    res = Math.max(res, maxSubArray(A));
  }
  return res;
};
// @lc code=end
