/*
 * @lc app=leetcode id=128 lang=javascript
 *
 * [128] Longest Consecutive Sequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  let num_set = new Set(nums), result = 0;

  for (const num of num_set) {
    // 如果当前的数，没有比它小一个的，就看有没有以他为第一个的连续的
    if (!num_set.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (num_set.has(currentNum + 1)) {
        currentNum += 1;
        currentStreak += 1;
      }

      result = Math.max(result, currentStreak);
    }
  }

  return result;
};
// @lc code=end


var longestConsecutive = function (nums) {
  // 转化成哈希集合，方便快速查找是否存在某个元素
  let set = new Set();
  for (let num of nums) {
    set.add(num);
  }

  let res = 0;

  for (let num of set) {
    if (set.has(num - 1)) {
      // num 不是连续子序列的第一个，跳过
      continue;
    }
    // num 是连续子序列的第一个，开始向上计算连续子序列的长度
    let curNum = num;
    let curLen = 1;

    while (set.has(curNum + 1)) {
      curNum += 1;
      curLen += 1;
    }
    // 更新最长连续序列的长度
    res = Math.max(res, curLen);
  }

  return res;
};
¶