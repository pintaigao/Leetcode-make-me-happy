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
  let [left, right, removeNums] = [0, arr.length - 1, arr.length - k], res = []
  while (removeNums > 0) {
    // 判断头尾的差值，删掉较大的那一个
    if (x - arr[left] <= arr[right] - x) {
      right--;
    } else {
      left++;
    }
    removeNums--;
  }

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


// 二分查找
var findClosestElements = function (arr, k, x) {
  // 搜索左侧边界的二分搜索
  var left_bound = function (x) {
    var left = 0, right = arr.length;

    while (left < right) {
      var mid = left + Math.floor((right - left) / 2);
      if (arr[mid] === x) {
        right = mid;
      } else if (arr[mid] < x) {
        left = mid + 1;
      } else if (arr[mid] > x) {
        right = mid;
      }
    }
    return left;
  };
  // 二分搜索找到 x 的位置
  var p = left_bound();
  // 两端都开的区间 (left, right)
  var left = p - 1, right = p, res = [];
  // 扩展区间，直到区间内包含 k 个元素
  while (right - left - 1 < k) {
    if (left === -1) {
      right++;
    } else if (right === arr.length) {
      left--;
    } else if (x - arr[left] > arr[right] - x) {
      right++;
    } else {
      left--;
    }
  }


  // 将从 left+1 到 right-1 的元素放入 result
  for (var i = left + 1; i <= right - 1; i++) {
    res.push(arr[i]);
  }
  return res;
};