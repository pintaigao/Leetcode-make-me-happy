/*
 * @lc app=leetcode id=229 lang=javascript
 *
 * [229] Majority Element II
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */

// Approach 1: Boyer-Moore Voting Algorithm
var majorityElement = function (nums) {
  var result = [];
  var oneThird = nums.length / 3;

  var number1 = nums[0];
  var number2 = nums[0];
  var count1 = 0;
  var count2 = 0;

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

majorityElement([1, 1, 1, 3, 3, 2, 2, 2]);
