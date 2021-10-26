/*
 * @lc app=leetcode id=912 lang=javascript
 *
 * [912] Sort an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function (nums) {
  let merge = function (nums, start, mi, end) {
    let lp = start;
    let rp = mi + 1;
    let buffer = [];
    let t = 0; //buffer pointer

    while (lp <= mi && rp <= end) {
      if (nums[lp] < nums[rp]) {
        buffer[t++] = nums[lp++];
      } else {
        buffer[t++] = nums[rp++];
      }
    }

    while (lp <= mi) buffer[t++] = nums[lp++];
    while (rp <= end) buffer[t++] = nums[rp++];
    //Now copy sorted buffer into original array
    for (let i = start; i <= end; i++) {
      nums[i] = buffer[i - start];
    }
  };
  let mergeSort = function (nums, start, end) {
    if (end - start + 1 <= 1) return; //Already sorted.
    let mi = start + parseInt((end - start) / 2);
    mergeSort(nums, start, mi);
    mergeSort(nums, mi + 1, end);
    merge(nums, start, mi, end);
  };
  let N = nums.length;
  mergeSort(nums, 0, N - 1);
  return nums;
};
// @lc code=end
