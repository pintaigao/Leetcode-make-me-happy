/*
 * @lc app=leetcode id=347 lang=javascript
 *
 * [347] Top K Frequent Elements
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
import { PriorityQueue } from "../../Algorithm/priority-queue"
// 用优先级队列解决这道题
var topKFrequent = function (nums, k) {
  // nums 中的元素 -> 该元素出现的频率
  let valToFreq = new Map(), res = new Array(k);
  for (let v of nums) { valToFreq.set(v, (valToFreq.get(v) || 0) + 1) }
  // 队列按照键值对中的值（元素出现频率）从小到大排序
  let pq = new PriorityQueue((entry1, entry2) => entry1[1] - entry2[1]);
  for (let entry of valToFreq.entries()) { // [key, value]值
    pq.enqueue(entry);
    if (pq.size() > k) { pq.dequeue(); }// 弹出最小元素，维护队列内是 k 个频率最大的元素}
  }
  for (let i = k - 1; i >= 0; i--) { res[i] = pq.dequeue()[0]; }// res 数组中存储前 k 个最大元素
  return res;
};

// 用计数排序的方法解决这道题
var topKFrequent2 = function (nums, k) {
  // nums 中的元素 -> 该元素出现的频率
  let valToFreq = new Map(), res = new Array(k)
  for (let v of nums) {
    valToFreq.set(v, (valToFreq.get(v) || 0) + 1);
  }

  // 频率 -> 这个频率有哪些元素
  let freqToVals = Array.from({ length: nums.length + 1 }, () => [])
  for (let [val, freq] of valToFreq.entries()) {
    freqToVals[freq].push(val);
  }

  // freqToVals 从后往前存储着出现最多的元素
  for (let i = freqToVals.length - 1; i > 0; i--) {
    if (freqToVals[i].length === 0) continue;
    for (let j = 0; j < freqToVals[i].length; j++) {
      // 将出现次数最多的 k 个元素装入 res
      res[k - 1] = freqToVals[i][j];
      k--;
      if (k === 0) { return res; }
    }
  }

  return null;
};
// @lc code=end
