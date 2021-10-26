/*
 * @lc app=leetcode id=494 lang=javascript
 *
 * [494] Target Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  let dp = function (index, curr_sum) {
    // Base Cases
    if (index < 0 && curr_sum == target) return 1;
    if (index < 0) return 0;

    // Decisions
    let positive = dp(index - 1, curr_sum + nums[index]);
    let negative = dp(index - 1, curr_sum - nums[index]);

    return positive + negative;
  };

  let index = nums.length - 1;
  let curr_sum = 0;
  return dp(index, curr_sum);
};

// 2. Map的方法
// let findTargetSumWays2 = function (nums, target) {
//   let map = {};

// let  dp = function(index,curSum){

//     Map.Entry<Integer,Integer> entry = Map.entry(index,curSum);
//     if(map.containsKey(entry)) return map.get(entry);

//     if(index<0 && curSum==target) return 1;
//     if(index<0) return 0;

//     int pos = dp(nums,target,index-1,nums[index]+curSum);
//     int neg = dp(nums,target,index-1,-nums[index]+curSum);

//     entry = Map.entry(index,curSum);
//     map.put(entry,pos+neg);

//     return pos+neg;

// }
//     return dp(nums.length-1,0);
// };

// 3. Using Subset
let findTargetSumWays3 = function (nums, S) {
  let subsetSum = function (nums, S) {
    let dp = new Array(S + 1).fill(0);
    dp[0] = 1;
    for (let i = 0; i < nums.length; i++) {
      for (let j = S; j >= nums[i]; j--) {
        dp[j] += dp[j - nums[i]];
      }
    }
    return dp[S];
  };

  let sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
  }

  if (S > sum || (sum + S) % 2 == 1) return 0;
  return subsetSum(nums, parseInt((sum + S) / 2));
};
// @lc code=end
