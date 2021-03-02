/*
 * @lc app=leetcode id=416 lang=javascript
 *
 * [416] Partition Equal Subset Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */

// Approach 2: Top Down Dynamic Programming - Memoization O(m*n), O(m*n)
var canPartition = function (nums) {
  let totalSum = 0;
  // find sum of all array elements
  for (let num of nums) {
    totalSum += num;
  }
  // if totalSum is odd, it cannot be partitioned into equal sum subset
  if (totalSum % 2 != 0) return false;
  let subSetSum = parseInt(totalSum / 2);
  console.log(subSetSum);
  let n = nums.length;
  let memo = new Array(n + 1).fill(null).map(() => {
    return new Array(subSetSum + 1);
  });

  console.log(memo);

  let dfs = function (n, subSetSum) {
    console.log("n is: " + n);
    console.log("subSetSum is: " + subSetSum);
    // Base Cases
    if (subSetSum == 0) return true;
    if (n == 0 || subSetSum < 0) return false;
    // check if subSetSum for given n is already computed and stored in memo
    if (memo[n][subSetSum] != null) return memo[n][subSetSum];
    let result = dfs(n - 1, subSetSum - nums[n - 1]) || dfs(n - 1, subSetSum);
    // store the result in memo
    memo[n][subSetSum] = result;
    return result;
  };

  let result = dfs(n - 1, subSetSum);

  console.log(memo);
  return result;
};

// canPartition([11, 1, 5, 5]);

// Approach 3: Bottom Up
let canPartition2 = function (nums) {
  let totalSum = 0;
  // find sum of all array elements
  for (let num of nums) {
    totalSum += num;
  }
  // if totalSum is odd, it cannot be partitioned into equal sum subset
  if (totalSum % 2 != 0) return false;
  let subSetSum = totalSum / 2;
  let n = nums.length;
  let dp = new Array(n + 1).fill(null).map(() => {
    return new Array(subSetSum + 1);
  });
  dp[0][0] = true;
  for (let i = 1; i <= n; i++) {
    let curr = nums[i - 1];
    for (let j = 0; j <= subSetSum; j++) {
      if (j < curr) dp[i][j] = dp[i - 1][j];
      else dp[i][j] = dp[i - 1][j] || dp[i - 1][j - curr];
    }
  }

  console.log(dp);
  return dp[n][subSetSum];
};

canPartition2([11, 1, 5, 5]);
// @lc code=end
