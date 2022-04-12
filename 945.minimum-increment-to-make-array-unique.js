/*
 * @lc app=leetcode id=945 lang=javascript
 *
 * [945] Minimum Increment to Make Array Unique
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
// Solution 1: Just Sort, O(NlogN)
// sort完成后，每次当前和前一个相比较，最少要比前一个大1
var minIncrementForUnique = function (A) {
  A.sort((a, b) => a - b);
  let res = 0,
    need = 0;
  for (let a of A) {
    // need - a < 0 表示当前值比前一个大，不需要操作
    res += Math.max(need - a, 0);
    // 下一个起码是这个数+1以保证不一样
    need = Math.max(a, need) + 1;
  }
  return res;
};

// Solution 2: HashMap, O(N)
// Instead of assign value one by one,
// we count the input numbers first, and assign values to all same value at one time.
var minIncrementForUnique2 = function (A) {
  let count = {};
  for (let a of A) {
    if (count[a] === undefined) {
      count[a] = 0;
    } else {
      count[a] += 1;
    }
  }

  console.log(count);

  let res = 0,
    need = 0;
  for (let x in count) {
    let v = count[x];
    // 相同的值有多少个，每个都要比前一个大1
    // 假设有3个相同的值，x1,x2,x3, 则至少要增加: 0 + x1 + 1 + x2 + 2 + x3 => x1 + x2 + x3 + 0 + 1 + 2
    // 所以至少要大6，即0+1+2的和为(v * (v - 1)) / 2
    res += v * Math.max(need - x, 0) + parseInt((v * (v - 1)) / 2);
    need = Math.max(need, x) + v;
  }
  console.log(res);
  return res;
};
// @lc code=end
