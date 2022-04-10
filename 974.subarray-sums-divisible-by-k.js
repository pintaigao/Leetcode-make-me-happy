/*
 * @lc app=leetcode id=974 lang=javascript
 *
 * [974] Subarray Sums Divisible by K
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// 哈希表 + 逐一统计
var subarraysDivByK = function (A, K) {
  // 将能够除尽的初始值赋为1
  let map = {
    0: 1,
  };
  let sum = 0,
    ans = 0; // cumulative sum
  // 然后开始挨个遍历
  for (let num of A) {
    sum += num;
    // 然后记下来余数，接着去哈希表里面找一找有没有前面存在的已经是同样余数的序列了
    const key = ((sum % K) + K) % K;
    // 有的话就加上这个次数
    if (map[key]) ans += map[key];
    // 再把现在的次数 + 1
    map[key] = map[key] + 1 || 1;
  }

  return ans;
};

subarraysDivByK([4, 5, 0, -2, -3, 1], 5);
// @lc code=end
