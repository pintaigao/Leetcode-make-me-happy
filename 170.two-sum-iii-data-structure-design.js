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
    this.map = new Map();
};

/**
 * Add the number to an internal data structure.. 
 * @param {number} number
 * @return {void}
 */
TwoSum.prototype.add = function (number) {
    this.map.set(number, (this.map.get(number) || 0) + 1);
};

/**
 * Find if there exists any pair of numbers which sum is equal to the value. 
 * @param {number} value
 * @return {boolean}
 */
TwoSum.prototype.find = function (value) {
    for (const key of this.map.keys()) {
        const val = parseInt(key);
        const toFind = value - val;
        if (this.map.has(toFind)) {
            if (val !== toFind) {
                return true;
            } else if (val === toFind && this.map.get(toFind) > 1) {
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

