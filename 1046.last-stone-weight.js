/*
 * @lc app=leetcode id=1046 lang=javascript
 *
 * [1046] Last Stone Weight
 */

// @lc code=start
/**
 * @param {number[]} stones
 * @return {number}
 */

// 1. 传统的方法
var lastStoneWeight = function (stones) {
  let removeLargest = () => {
    let result = Math.max(...stones);
    // 把最大的石头从数组中移除
    stones.splice(stones.indexOf(result), 1);
    return result;
  };

  while (stones.length > 1) {
    // 获得最大的石头
    let stone1 = removeLargest();
    // 获得第二大的石头
    let stone2 = removeLargest();
    if (stone1 != stone2) {
      stones.push(stone1 - stone2);
    }
  }

  return stones.length ? stones[0] : 0;
};

// @lc code=end
