/*
 * @lc app=leetcode id=454 lang=javascript
 *
 * [454] 4Sum II
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @param {number[]} D
 * @return {number}
 */

// Approach 1: Hashmap O(n^2) O(n^2)
var fourSumCount = function (A, B, C, D) {
  let cnt = 0;
  let m = {};
  for (let a of A)
    for (let b of B) {
      if (!m.hasOwnProperty(a + b)) {
        m[a + b] = 1;
      } else {
        m[a + b] += 1;
      }
    }

  for (let c of C)
    for (let d of D) {
      if (!m.hasOwnProperty(-(c + d))) {
        continue;
      } else {
        cnt += m[-(c + d)];
      }
    }

  return cnt;
};

// Approach 2: kSum II
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
    for (let a of lists[i])
      cnt += countComplements(lists, m, i + 1, complement - a);
    return cnt;
  };

  return kSumCount();
};
// fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]);
// @lc code=end
