/*
 * @lc app=leetcode id=454 lang=javascript
 *
 * [454] 4Sum II
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
/* 1.哈希表 */
var fourSumCount = function (A, B, C, D) {
  let cnt = 0;
  let m = {};
  // 把数组A和B中的数字依次相加，得到的结果和出现的次数存入哈希表中
  for (let a of A)
    for (let b of B) {
      m[a + b] = (m[a + b] || 0) + 1;
    }

  for (let c of C)
    for (let d of D) {
      // 如果map中存在-(c+d)，则说明他们的和为0，因此结果加1
      if (!m.hasOwnProperty(-(c + d))) {
        continue;
      } else {
        cnt += m[-(c + d)];
      }
    }

  return cnt;
};

/* kSum */
let fourSumCount = function (A, B, C, D) {
  let kSumCount = function (lists) {
    let m = {};
    addToHash(lists, m, 0, 0);
    return countComplements(lists, m, parseInt(lists.length / 2), 0);
  };

  let addToHash = function (lists, m, i, sum) {
    if (i == parseInt(lists.length / 2)) {
      if (!m.hasOwnProperty(sum)) {
        m[sum] = 1;
      } else {
        m[sum] += 1;
      }
    } else {
      for (let a of lists[i]) {
        addToHash(lists, m, i + 1, sum + a);
      }
    }
  };
  let countComplements = function (lists, m, i, complement) {
    if (i == lists.length) {
      if (!m.hasOwnProperty(complement)) {
        return 0;
      } else {
        return m[complement];
      }
    }
    let cnt = 0;
    for (let a of lists[i]) cnt += countComplements(lists, m, i + 1, complement - a);
    return cnt;
  };

  return kSumCount();
};
// @lc code=end
