/*
 * @lc app=leetcode id=1331 lang=javascript
 *
 * [1331] Rank Transform of an Array
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @return {number[]}
 */

// 1. Traditional HashMap Sort -> Map
var arrayRankTransform = function (arr) {
  let A = arr.slice();
  A.sort((a, b) => a - b);
  let rank = {};
  for (let x of A) {
    if (!rank[x]) {
      rank[x] = Object.keys(rank).length + 1;
    }
  }

  for (let i = 0; i < arr.length; ++i) {
    A[i] = rank[arr[i]];
  }

  return A;
};

// 2. JS Solution
let arrayRankTransform2 = function (arr) {
  var sorted = Array.from(new Set(arr)).sort((a, b) => a - b);
  return arr.map((x) => sorted.indexOf(x) + 1);
};

// 3. Fastest Solution
let arrayRankTransform3 = function (arr) {
  const uniq = [...new Set(arr)];
  uniq.sort((a, b) => a - b);

  const map = new Map();
  uniq.forEach((item, idx) => map.set(item, idx + 1));
  return arr.map((item) => map.get(item));
};
// arrayRankTransform([37, 12, 28, 9, 100, 56, 80, 80, 5, 12]);
// @lc code=end
