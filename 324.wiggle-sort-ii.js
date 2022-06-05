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
/* 传统的做法 */
var wiggleSort = function (nums) {
  let copy = nums.slice().sort((a, b) => a - b);

  let [left, right] = [parseInt((nums.length + 1) / 2) - 1, nums.length - 1]; // median index and largest value index

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

/* Queue的做法 */
var wiggleSort = function (nums) {
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
};

// @lc code=end
