/*
 * @lc app=leetcode id=170 lang=javascript
 *
 * [170] Two Sum III - Data structure design
 */

// @lc code=start
/**
 * Initialize your data structure here.
 */
var TwoSum = function () {
  this.map = {};
};

/**
 * Add the number to an internal data structure..
 * @param {number} number
 * @return {void}
 */
TwoSum.prototype.add = function (number) {
  this.map[number] = (this.map[number] || 0) + 1;
};

/**
 * Find if there exists any pair of numbers which sum is equal to the value.
 * @param {number} value
 * @return {boolean}
 */
TwoSum.prototype.find = function (value) {
  for (const key of Object.keys(this.map)) {
    const val = parseInt(key);
    const toFind = value - val;
    if (this.map.hasOwnProperty(toFind)) {
      if (val !== toFind) {
        return true;
      } else if (val === toFind && this.map[toFind] > 1) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Your TwoSum object will be instantiated and called as such:
 * var obj = new TwoSum()
 * obj.add(number)
 * var param_2 = obj.find(value)
 */
// @lc code=end
