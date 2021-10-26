/*
 * @lc app=leetcode id=324 lang=javascript
 *
 * [324] Wiggle Sort II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

// 正常人的做法
var wiggleSort = function (nums) {
  let copy = nums.slice();
  copy.sort((a, b) => a - b);

  let n = nums.length;

  let left = parseInt((n + 1) / 2) - 1; // median index
  let right = n - 1; // largest value index

  for (let i = 0; i < nums.length; i++) {
    // copy large values on odd indexes
    if (i % 2 == 1) {
      nums[i] = copy[right];
      right -= 1;
    } else {
      // copy values decremeting from median on even indexes
      nums[i] = copy[left];
      left -= 1;
    }
  }
};

// 或者用queue
let wiggleSort2 = function (nums) {
  let queue = [];
  for (let num of nums) {
    queue.push(num);
  }

  queue.sort((a, b) => b - a);

  let i = 1;
  while (queue.length) {
    if (i >= nums.length) {
      i = 0;
    }

    nums[i] = queue.shift();
    i += 2;
  }

  console.log(nums);
};

// JS 的其他方法
let wiggleSort3 = function (nums) {
  nums.sort((a, b) => a - b);
  let midIdx = Math.floor(nums.length / 2);
  if (nums.length % 2 !== 0) {
    midIdx += 1;
  }
  const array1 = nums.slice(0, midIdx);
  const array2 = nums.slice(midIdx);

  for (let i = 0; i < nums.length; i++) {
    if (i % 2 === 0) {
      nums[i] = array1.pop();
    } else {
      nums[i] = array2.pop();
    }
  }
};

// O(n)的方法

// @lc code=end
