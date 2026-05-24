/*
 * @lc app=leetcode id=528 lang=javascript
 *
 * [528] Random Pick with Weight
 */

// @lc code=start
/**
 * @param {number[]} w
 */
var Solution = function (w) {
  this.sum = new Array(w.length + 1);
  // 前缀和
  for (let i = 1; i <= w.length; i++) this.sum[i] = this.sum[i - 1] + w[i - 1];
};

/**
 * @return {number}
 */
Solution.prototype.pickIndex = function () {
  let [t, l, r] = [parseInt(Math.random() * this.sum[this.sum.length - 1]) + 1, 1, this.sum.length - 1];
  while (l < r) {
    let mid = parseInt((l + r) / 2);
    if (this.sum[mid] >= t) r = mid;
    else l = mid + 1;
  }
  return r - 1;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(w)
 * var param_1 = obj.pickIndex()
 */
// @lc code=end
