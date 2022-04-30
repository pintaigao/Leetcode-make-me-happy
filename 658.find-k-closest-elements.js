/*
 * @lc app=leetcode id=658 lang=javascript
 *
 * [658] Find K Closest Elements
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
/* 方法一：排除法，头尾与x的差，删掉较大的那一个 */
var findClosestElements = function (arr, k, x) {
  // removeNums: 因为k是要保留的数字个数，所以删掉的数字个数为arr.length - k
  let [left, right, removeNums] = [0, arr.length - 1, arr.length - k];
  while (removeNums > 0) {
    // 判断头尾的差值，删掉较大的那一个
    if (x - arr[left] <= arr[right] - x) {
      right--;
    } else {
      left++;
    }
    removeNums--;
  }

  let res = [];
  for (let i = left; i < left + k; i++) {
    res.push(arr[i]);
  }
  return res;
};

/* Binary Search */
var findClosestElements = function (arr, k, x) {
  let [left, right] = [0, arr.length - 1];
  while (left < right) {
    let mid = parseInt((left + right) / 2);
    if (x - arr[mid] > arr[mid + k] - x) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }

  let result = arr.slice(left, left + k);
  return result;
};
// @lc code=end
