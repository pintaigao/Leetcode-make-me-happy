/*
 * @lc app=leetcode id=974 lang=javascript
 *
 * [974] Subarray Sums Divisible by K
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */

// 这个数学方法看不懂
var subarraysDivByK = function (A, K) {
  let N = A.length;
  let P = new Array(N + 1).fill(0);
  for (let i = 0; i < N; ++i) P[i + 1] = P[i] + A[i];

  console.log(P);

  let count = new Array(K).fill(0);

  for (let x of P) count[((x % K) + K) % K] += 1;
  console.log(count);

  let ans = 0;
  for (let v of count) ans += (v * (v - 1)) / 2;
  return ans;
};

// HashMap的方法
var subarraysDivByK2 = function (A, K) {
  let mp = {};
  let sum = 0; // cumulative sum
  for (let i = 0; i < A.length; i++) {
    sum += A[i];
    // mod twice for negative numbers
    const key = ((sum % K) + K) % K;
    // if mp[key] is undefined set 1, else increase 1
    mp[key] = mp[key] + 1 || 1;
  }

  console.log(mp);
  let s = 0;
  for (let i = 0; i < K; i++) {
    if (mp[i] > 1) {
      s += (mp[i] * (mp[i] - 1)) / 2; // sum of 1 to mp[i] - 1;
    }
  }
  return s + (mp[0] || 0);
};

subarraysDivByK2([4, 5, 0, -2, -3, 1], 5);
// @lc code=end
