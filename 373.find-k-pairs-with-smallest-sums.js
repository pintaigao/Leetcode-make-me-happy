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
var kSmallestPairs = function (nums1, nums2, k) {
  let len1 = nums1.length,
    len2 = nums2.length;
  let arr = new Array(len1).fill(0),
    resList = [];
  while (k > 0) {
    let min = +Infinity;
    let index = -1;
    for (let i = 0; i < len1; i++) {
      if (arr[i] >= len2) {
        continue;
      }
      if (nums1[i] + nums2[arr[i]] < min) {
        min = nums1[i] + nums2[arr[i]];
        index = i;
      }
    }
    if (index == -1) {
      break;
    }
    resList.push([nums1[index], nums2[arr[index]]]);
    arr[index]++;
    k -= 1;
  }
  return resList;
};

// 每放一次sort一次O(klogK)
var kSmallestPairs2 = function (nums1, nums2, k) {
  let que = [];
  let res = [];
  if (nums1.length == 0 || nums2.length == 0 || k == 0) {
    return res;
  }

  for (let i = 0; i < nums1.length && i < k; i++) {
    que.push([nums1[i], nums2[0], 0]);
  }

  while (k > 0 && que.length) {
    k -= 1;
    let cur = que.shift();
    res.push([cur[0], cur[1]]);
    let nextIndex = cur[2] + 1;
    if (cur[2] == nums2.length - 1) continue;
    que.push([cur[0], nums2[nextIndex], nextIndex]);
    que.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));
  }

  console.log(res);
  return res;
};

kSmallestPairs2([1, 7, 11], [2, 4, 6], 3);
// @lc code=end
