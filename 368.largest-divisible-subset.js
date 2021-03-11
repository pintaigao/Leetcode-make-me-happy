/*
 * @lc app=leetcode id=368 lang=javascript
 *
 * [368] Largest Divisible Subset
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */

// Approach 1: Dynamic Programming O(N^2) O(N^2)
var largestDivisibleSubset = function (nums) {
  // Test case with empty set.
  let n = nums.length;
  if (n == 0) return [];

  // Container to keep the largest divisible subset
  //   that ends with each of the nums.
  let EDS = [];
  for (let num of nums) EDS.push([]);

  console.log(EDS);

  /* Sort the original list in ascending order. */
  nums.sort((a, b) => a - b);

  /* Calculate all the values of EDS(X_i) */
  for (let i = 0; i < nums.length; ++i) {
    let maxSubset = [];

    // Find the largest divisible subset of previous elements.
    for (let k = 0; k < i; ++k)
      if (nums[i] % nums[k] == 0 && maxSubset.length < EDS[k].length)
        maxSubset = EDS[k];

    // Extend the found subset with the element itself.
    EDS[i] = [...EDS[i], ...maxSubset];
    EDS[i].push(nums[i]);
    console.log(EDS);
  }
  /* Find the largest of EDS values  */
  let ret = [];
  for (let i = 0; i < n; ++i) {
    if (ret.length < EDS[i].length) {
      ret = EDS[i];
    }
  }

  return ret;
};

// Approach 2: Dynamic Programming with Less Space
let largestDivisibleSubset2 = function (nums) {
  // Test case with empty set.
  let n = nums.length;
  if (n == 0) return [];

  // Container to keep the size of the largest divisible subset
  //   that ends with each of the nums.
  let dp = [];

  /* Sort the original list in ascending order. */
  nums.sort((a, b) => a - b);

  let maxSubsetSize = -1,
    maxSubsetIndex = -1;

  /* Calculate the rest of EDS(X_i) */
  for (let i = 0; i < n; ++i) {
    let subsetSize = 0;

    // Find the size of the largest divisible subset.
    for (let k = 0; k < i; ++k)
      if (nums[i] % nums[k] == 0 && subsetSize < dp[k]) subsetSize = dp[k];

    // Extend the found subset with the element itself.
    dp[i] = subsetSize + 1;

    // We reuse this loop to obtain the largest subset size
    //   in order to prepare for the reconstruction of subset.
    if (maxSubsetSize < dp[i]) {
      maxSubsetSize = dp[i];
      maxSubsetIndex = i;
    }
  }

  /* Reconstruct the largest divisible subset  */
  let subset = [];
  let currSize = maxSubsetSize;
  let currTail = nums[maxSubsetIndex];
  for (let i = maxSubsetIndex; i >= 0; --i) {
    if (currSize == 0) break;

    if (currTail % nums[i] == 0 && currSize == dp[i]) {
      subset.unshift(nums[i]);
      currTail = nums[i];
      currSize -= 1;
    }
  }

  return subset;
};

largestDivisibleSubset([1, 2, 4, 7, 8]);
// @lc code=end
