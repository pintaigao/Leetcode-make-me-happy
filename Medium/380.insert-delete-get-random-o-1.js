/*
 * @lc app=leetcode id=380 lang=javascript
 *
 * [380] Insert Delete GetRandom O(1)
 */

// @lc code=start

var RandomizedSet = function () {
  this.nums = [];
  this.indices = new Map();
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.indices.has(val)) {
    return false;
  }
  let index = this.nums.length;
  // 将val插入到最后一个位置
  this.nums.push(val);
  // 将val和index关联起来
  this.indices.set(val, index);
  return true;
};

/**
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  if (!this.indices.has(val)) {
    return false;
  }
  let id = this.indices.get(val);
  // 将最后一个元素和要删除的元素交换
  this.nums[id] = this.nums[this.nums.length - 1];
  // overwrite
  this.indices.set(this.nums[id], id);
  // 删除最后一个元素
  this.nums.pop();
  // 删除val
  this.indices.delete(val);
  return true;
};

/**
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  const randomIndex = Math.floor(Math.random() * this.nums.length);
  return this.nums[randomIndex];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// @lc code=end
