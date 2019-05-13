/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  let left = 1;
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    result[i] = left;
    left *= nums[i];
  }

  console.log(result);

  let right = 1;

  for (let i = nums.length - 1; i >= 0; i--) {
    result[i] *= right;
    right *= nums[i]
  }

  console.log(result);
  return result;
};


productExceptSelf([1,2,3,4])
