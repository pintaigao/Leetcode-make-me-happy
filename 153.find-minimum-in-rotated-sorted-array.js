/*
 * @lc app=leetcode id=153 lang=javascript
 *
 * [153] Find Minimum in Rotated Sorted Array
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  if(nums[0] <= nums[nums.length-1])
      return nums[0];
      
  let left = 0, right = nums.length-1, mid = 0;
  
  while(left < right) {
      mid = parseInt((left+right)/2);
      
      if(nums[mid] > nums[left]) {
          left = mid;
      } else if(nums[mid] < nums[left]) {
          right = mid;
      } else {
          break;
      }
      
  }
  
  return left == mid ? nums[mid+1] : nums[mid];
};
