/*
 * @lc app=leetcode id=134 lang=javascript
 *
 * [134] Gas Station
 */

// @lc code=start
/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
/* 1. 暴击解 */
var canCompleteCircuit = function (gas, cost) {
  let n = gas.length;
  //考虑从每一个点出发
  for (let i = 0; i < n; i++) {
    let j = i;
    let remain = gas[i];
    //当前剩余的油能否到达下一个点
    while (remain - cost[j] >= 0) {
      //减去花费的加上新的点的补给
      remain = remain - cost[j] + gas[(j + 1) % n];
      j = (j + 1) % n;
      //j 回到了 i
      if (j == i) {
        return i;
      }
    }
  }
  //任何点都不可以
  return -1;
};

/* 2.优化
 * 每考虑一个点，就将当前点能够到达的最远距离记录下来，同时到达最远距离时候的剩余汽油也要记下来。
 */

var canCompleteCircuit = function (gas, cost) {
  let n = gas.length;
  //记录能到的最远距离
  let farIndex = new Array(n).fill(-1);
  //记录到达最远距离时候剩余的汽油
  let farIndexRemain = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let j = i;
    // 每个点最远能够到哪
    let remain = gas[i];
    while (remain - cost[j] >= 0) {
      //到达下个点后的剩余
      remain = remain - cost[j];
      j = (j + 1) % n;
      //判断之前有没有考虑过这个点
      if (farIndex[j] != -1) {
        //加上当时剩余的汽油
        remain = remain + farIndexRemain[j];
        //j 进行跳跃
        j = farIndex[j];
      } else {
        //加上当前点的补给
        remain = remain + gas[j];
      }
      if (j == i) {
        return i;
      }
    }

    //记录当前点最远到达哪里
    farIndex[i] = j;
    //记录当前点的剩余
    farIndexRemain[i] = remain;
  }
  return -1;
};

// @lc code=end
