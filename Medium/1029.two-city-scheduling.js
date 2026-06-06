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
  // 两个人的花费相比较，根据的是priceA(a[0] - a[1]) - priceB(b[0] - b[1])的diff大小来排序(所以就是负的在前面),然后当然是ascending order
  // 数组里的每个值，前往 a 的 cost 和前往b 的 cost，根据他们的 diff，按照 diff 从小到大排序
  // [259, 770] => 259 - 770 = -511, [448, 54] => 448 - 54 = 394, 则259, 770在前面，448, 54在后面（因为负数在前面，表示a[0] < a[1]）
  costs.sort((a, b) => a[0] - a[1] - (b[0] - b[1]));

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



// 练习