/*
 * @lc app=leetcode id=1570 lang=javascript
 *
 * [1570] Dot Product of Two Sparse Vectors
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {SparseVector}
 */
var SparseVector = function (nums) {
  this.map = {};
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    if (x != 0) {
      map[i] = x;
    }
  }
};

// Return the dotProduct of two sparse vectors
/**
 * @param {SparseVector} vec
 * @return {number}
 */
SparseVector.prototype.dotProduct = function (vec) {
let product = 0;
        let  [m1, m2] = [{}, {}];
        if (map.size() <= vec.map.size()) {
            m1 = map;
            m2 = vec.map;
        } else {
            m1 = vec.map;
            m2 = map;
        }
        for (var p : m1.entrySet()) {
            Integer k = p.getKey();
            Integer v = m2.get(k);
            if (v != null) {
                product += p.getValue() * v;
            }
        }
        return product;
};

// Your SparseVector object will be instantiated and called as such:
// let v1 = new SparseVector(nums1);
// let v2 = new SparseVector(nums2);
// let ans = v1.dotProduct(v2);
// @lc code=end
