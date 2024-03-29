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

/* O(n)的做法 */
var wiggleSort = function (nums) {
  //5001个桶
  let bucket = new Array(5001).fill(0);
  for (let num of nums) {
    bucket[num]++;
  }
  let j = 5000;
  //插空放 较大元素
  for (let i = 1; i < nums.length; i += 2) {
    while (bucket[j] == 0) {
      j--;
    }
    nums[i] = j;
    bucket[j]--;
  }
  //插空放 较小元素
  for (let i = 0; i < nums.length; i += 2) {
    while (bucket[j] == 0) {
      j--;
    }
    nums[i] = j;
    bucket[j]--;
  }
};

// @lc code=end
