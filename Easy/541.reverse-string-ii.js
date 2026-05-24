/*
 * @lc app=leetcode id=541 lang=javascript
 *
 * [541] Reverse String II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  let swap = function (arr, l, r) {
    while (l < r) {
      let temp = arr[l];
      arr[l] = arr[r];
      arr[r] = temp;
      l += 1;
      r -= 1;
    }
  };

  let arr = s.split("");
  let n = arr.length;
  let i = 0;
  while (i < n) {
    let j = Math.min(i + k, n);
    swap(arr, i, j - 1);
    i += 2 * k;
  }
  return arr.join("");
};
// @lc code=end
