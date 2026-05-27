/*
 * @lc app=leetcode id=1010 lang=javascript
 *
 * [1010] Pairs of Songs With Total Durations Divisible by 60
 */

// @lc code=start
/**
 * @param {number[]} time
 * @return {number}
 */

// Use an Array to Store Frequencies
/* 首先，对所有时间求 mod 60 的余数，然后进行归类计数，余数相同的为一类。
然后，成对的时间必定 mod 60 的余数之和为 60，比如：余数 20 和 40 的时间数量为 a 和 b，他们之间的配对结果就是 a * b。
特别注意：特殊余数是 0 或 30 的时候，此时必定只和自身类别中的时间进行配对。
 */
var numPairsDivisibleBy60 = function (time) {
  // 60个数，每个index带表一个数字，表示该数字的倍数
  let remainders = new Array(60).fill(0), count = 0;
  for (let t of time) {
    if (t % 60 == 0) {
      // check if a%60==0 && b%60==0
      count += remainders[0];
    } else {
      // check if a%60+b%60==60
      // 假如说 t=30，t%60=30， 那下一个假如 t%60=30，（t 可以是 60 的倍数+30，如 210，可以证明 210 + 30 也是 60 的倍数）
      // 所以在这里就是找前缀，出现过的余数的个数
      count += remainders[60 - (t % 60)];
    }
    remainders[t % 60] += 1; // remember to update the remainders
  }
  return count;
};

// HashTable的方法
var numPairsDivisibleBy60 = function (time) {
  // % 60 map
  let m = new Map();
  let res = 0;
  for (let t of time) {
    let cur = t % 60;
    let tar = (60 - cur) % 60;
    if (m.has(tar)) res += m.get(tar);
    if (!m.has(cur)) m.set(cur, 1);
    else m.set(cur, m.get(cur) + 1);
  }
  return res;
};

numPairsDivisibleBy60([30, 20, 150, 100, 40]);
// @lc code=end
