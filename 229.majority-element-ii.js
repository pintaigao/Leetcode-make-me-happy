/*
 * @lc app=leetcode id=229 lang=javascript
 *
 * [229] Majority Element II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
/* Map的做法 */
var majorityElement = function (nums) {
  let n = nums.length;
  let map = {};
  let result = [];
  for (let i of nums) {
    map[i] = map[i] ? map[i] + 1 : 1;
  }
  for (let i of Object.keys(map)) {
    if (map[i] > parseInt(n / 3)) result.push(i);
  }
  return result;
};

/* 摩尔投票法 */
var majorityElement = function (nums) {
  var [result, oneThird, number1, number2, count1, count2] = [[], Math.floor(nums.length / 3), nums[0], nums[0], 0, 0];

  for (var i = 0; i < nums.length; i++) {
    if (nums[i] === number1) {
      count1++;
    } else if (nums[i] === number2) {
      count2++;
    } else if (count1 === 0) {
      number1 = nums[i];
      count1 = 1;
    } else if (count2 === 0) {
      number2 = nums[i];
      count2 = 1;
    } else {
      count1--;
      count2--;
    }
  }

  count1 = 0;
  count2 = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] === number1) {
      count1++;
    } else if (nums[i] === number2) {
      count2++;
    }
  }

  if (count1 > oneThird) {
    result.push(number1);
  }

  if (count2 > oneThird) {
    result.push(number2);
  }

  return result;
};
// @lc code=end
