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
var numPairsDivisibleBy60 = function (time) {
  let remainders = new Array(60).fill(0);
  let count = 0;
  for (let t of time) {
    if (t % 60 == 0) {
      // check if a%60==0 && b%60==0
      count += remainders[0];
    } else {
      // check if a%60+b%60==60
      console.log(`t for is ${t} and t % 60 the result is: ${t % 60}`);
      count += remainders[60 - (t % 60)];
    }
    remainders[t % 60] += 1; // remember to update the remainders
  }
  return count;
};

numPairsDivisibleBy60([30, 20, 150, 100, 40]);
// @lc code=end
