/*
 * @lc app=leetcode id=1029 lang=javascript
 *
 * [1029] Two City Scheduling
 */

// @lc code=start
/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function (costs) {
  // 根据的是priceA - priceB的diff大小来排序(所以就是负的在前面),然后当然是ascending order
  costs.sort((a, b) => {
    return a[0] - a[1] - (b[0] - b[1]);
  });

  console.log(costs);

  let total = 0;
  let n = costs.length / 2;
  // To optimize the company expenses,
  // send the first n persons to the city A
  // and the others to the city B
  for (let i = 0; i < n; ++i) {
    total += costs[i][0] + costs[i + n][1];
  }
  return total;
};

twoCitySchedCost([
  [259, 770],
  [448, 54],
  [926, 667],
  [184, 139],
  [840, 118],
  [577, 469],
]);
// @lc code=end
