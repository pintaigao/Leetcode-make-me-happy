/*
 * @lc app=leetcode id=373 lang=javascript
 *
 * [373] Find K Pairs with Smallest Sums
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[][]}
 */

/* Solution 1: 优先队列 */
var kSmallestPairs = function (nums1, nums2, k) {
  const res = [];
  const pq = new MinPriorityQueue({ compare: (a, b) => nums1[a[0]] + nums2[a[1]] - (nums1[b[0]] + nums2[b[1]]) });

  // 因为每一组数的第一个是从nums1来，所以【index，0】
  for (let i = 0; i < nums1.length; i++) pq.enqueue([i, 0]);

  // 然后看第二个数组，数组里的每一个数都和PriorityQueue里的每一组的和比较
  while (res.length < k && pq.size()) {
    let [i, j] = pq.dequeue();

    for (; j < nums2.length && res.length < k; j++) {
      // 排头的数对和更小
      const [i1, j1] = pq.front() || [];
      if (pq.size() && nums1[i1] + nums2[j1] < nums1[i] + nums2[j]) {
        pq.enqueue([i, j]);
        break;
      }

      // 队头的数对和相等或更大
      res.push([nums1[i], nums2[j]]);
    }
  }

  return res;
};
// @lc code=end
