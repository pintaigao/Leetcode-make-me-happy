/*
 * @lc app=leetcode id=945 lang=javascript
 *
 * [945] Minimum Increment to Make Array Unique
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number}
 */
// Solution 1: Just Sort, O(NlogN)
// Compared with previous number, the current number need to be at least prev + 1.
var minIncrementForUnique = function (A) {
  A.sort((a, b) => a - b);
  let res = 0,
    need = 0;
  for (let a of A) {
    res += Math.max(need - a, 0);
    // 下一个保证跟前面的不一样，但跟下一个比较就不知道了
    need = Math.max(a, need) + 1;
    console.log(a, need);
  }
  return res;
};

// Solution 2, O(KlogK) using TreeMap (no in Javascript)
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
    res += v * Math.max(need - x, 0) + parseInt((v * (v - 1)) / 2);
    need = Math.max(need, x) + v;
  }
  console.log(res);
  return res;
};

// Solution 3: Union Find O(n) O(n)
var minIncrementForUnique3 = function (A) {
  root = {};

  let find = function (x) {
    if (root.hasOwnProperty(x)) {
      root[x] = find(root[x] + 1);
    } else {
      root[x] = x;
    }
    return root[x];
  };

  let res = 0;
  for (let a of A) res += find(a) - a;
  return res;
};

minIncrementForUnique2([3, 2, 1, 2, 1, 7]);
// @lc code=end
