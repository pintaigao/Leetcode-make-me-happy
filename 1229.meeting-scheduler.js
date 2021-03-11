/*
 * @lc app=leetcode id=1229 lang=javascript
 *
 * [1229] Meeting Scheduler
 */

// @lc code=start
/**
 * @param {number[][]} slots1
 * @param {number[][]} slots2
 * @param {number} duration
 * @return {number[]}
 */

// Approach 1: Two pointers O(MlogM+NlogN) O(1)
var minAvailableDuration = function (slots1, slots2, duration) {
  // 按开始available时间排序
  slots1.sort((a, b) => a[0] - b[0]);
  slots2.sort((a, b) => a[0] - b[0]);

  let pointer1 = 0,
    pointer2 = 0;

  while (pointer1 < slots1.length && pointer2 < slots2.length) {
    // find the boundaries of the intersection, or the common slot
    let intersectLeft = Math.max(slots1[pointer1][0], slots2[pointer2][0]);
    let intersectRight = Math.min(slots1[pointer1][1], slots2[pointer2][1]);
    console.log(intersectLeft, intersectRight);
    if (intersectRight - intersectLeft >= duration) {
      return [intersectLeft, intersectLeft + duration];
    }
    // 两个指针指的time slot，先结束的那个往后移一个
    if (slots1[pointer1][1] < slots2[pointer2][1]) {
      pointer1 += 1;
    } else {
      pointer2 += 1;
    }
  }
  return [];
};

// Approach 2: Heap(PriorityQueue) O((M+N)log(M+N)) O(M+N)
let minAvailableDuration2 = function (slots1, slots2, duration) {
  let timeslots = [];

  for (let slot of slots1) {
    if (slot[1] - slot[0] >= duration) timeslots.push(slot);
  }

  for (let slot of slots2) {
    if (slot[1] - slot[0] >= duration) timeslots.push(slot);
  }
  timeslots.sort((a, b) => a[0] - b[0]);

  // 为什么timeslots里面的slot都不知道是谁的情况下，能取得值？
  while (timeslots.length > 1) {
    let slot1 = timeslots.shift();
    let slot2 = timeslots[0];
    if (slot1[1] >= slot2[0] + duration) {
      return [slot2[0], slot2[0] + duration];
    }
  }
  return [];
};

minAvailableDuration2(
  [
    [10, 50],
    [60, 120],
    [140, 210],
  ],
  [
    [0, 15],
    [60, 70],
  ],
  8
); // @lc code=end
