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

// Approach 2: Sorted Array-Based Simulation
var lastStoneWeight = function (stones) {
  // Insert all the stones into a Max-Heap.
  let heap = [];
  for (let stone of stones) {
    heap.push(stone);
  }

  // While there is more than one stone left, we need to remove the two largest
  // and smash them together. If there is a resulting stone, we need to put into
  // the heap.
  heap.sort((a, b) => b - a);
  while (heap.length > 1) {
    let stone1 = heap.shift();
    let stone2 = heap.shift();
    if (stone1 != stone2) {
      heap.push(stone1 - stone2);
    }
    heap.sort((a, b) => b - a);
  }

  // Check whether or not there is a stone left to return.
  return heap.length === 0 ? 0 : heap.shift();
};
// @lc code=end
