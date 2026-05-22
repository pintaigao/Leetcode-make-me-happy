/*
 * @lc app=leetcode id=238 lang=javascript
 *
 * [238] Product of Array Except Self
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  // The length of the input array
  let length = nums.length;

  // Final answer array to be returned
  let answer = new Array(length);

  // answer[i] contains the product of all the elements to the left
  // Note: for the element at index '0', there are no elements to the left,
  // so the answer[0] would be 1
  answer[0] = 1;
  for (let i = 1; i < length; i++) {
    // answer[i - 1] already contains the product of elements to the left of 'i - 1'
    // Simply multiplying it with nums[i - 1] would give the product of all
    // elements to the left of index 'i'
    answer[i] = nums[i - 1] * answer[i - 1];
  }

  // R contains the product of all the elements to the right
  // Note: for the element at index 'length - 1', there are no elements to the right,
  // so the R would be 1
  let R = 1;
  for (let i = length - 1; i >= 0; i--) {
    // For the index 'i', R would contain the
    // product of all elements to the right. We update R accordingly
    answer[i] = answer[i] * R;
    R *= nums[i];
  }

  return answer;
};
// @lc code=end


var productExceptSelf = function (nums) {
  let n = nums.length, prefix = new Array(n), suffix = new Array(n);
  prefix[0] = nums[0], suffix[n - 1] = nums[n - 1];
  // 从左到右的前缀积，prefix[i] 是 nums[0..i] 的元素积
  for (let i = 1; i < nums.length; i++) {
    prefix[i] = prefix[i - 1] * nums[i];
  }
  // 从右到左的前缀积，suffix[i] 是 nums[i..n-1] 的元素积
  for (let i = n - 2; i >= 0; i--) {
    suffix[i] = suffix[i + 1] * nums[i];
  }
  // 结果数组
  let res = new Array(n);
  res[0] = suffix[1], res[n - 1] = prefix[n - 2];
  for (let i = 1; i < n - 1; i++) {
    // 除了 nums[i] 自己的元素积就是 nums[i] 左侧和右侧所有元素之积
    res[i] = prefix[i - 1] * suffix[i + 1];
  }
  return res;
};