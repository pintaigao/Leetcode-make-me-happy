/*
 * @lc app=leetcode id=1578 lang=javascript
 *
 * [1578] Minimum Deletion Cost to Avoid Repeating Letters
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number[]} cost
 * @return {number}
 */

// 转换下思路：delete the same char group but leave only one max cost char
var minCost = function (s, cost) {
  let res = 0,
    max_cost = 0,
    sum_cost = 0,
    n = s.length;
  for (let i = 0; i < n; ++i) {
    if (i > 0 && s[i] != s[i - 1]) {
      res += sum_cost - max_cost;
      sum_cost = 0;
      max_cost = 0;
    }
    console.log("res is:" + res);
    sum_cost += cost[i];
    max_cost = Math.max(max_cost, cost[i]);
    console.log("sum_cost is: " + sum_cost);
    console.log("max_cost is: " + max_cost);
    console.log();
  }

  res += sum_cost - max_cost;
  return res;
};

let minCost2 = function (s, cost) {
  let n = s.length;
  let result = 0;
  for (let i = 1; i < n; i++) {
    if (s[i] == s[i - 1]) {
      result = result + Math.min(cost[i], cost[i - 1]);
      cost[i] = Math.max(cost[i], cost[i - 1]);
    }
  }
  return result;
};

// Solution 3: Stack
let minCost3 = function (s, cost) {
  let stack = [];
  let total_cost = 0;
  for (let i = 0; i < s.length; i++) {
    if (stack.length === 0 || stack[stack.length - 1][0] !== s[i]) {
      stack.unshift([s[i], cost[i]]);
    } else {
      if (stack[stack.length - 1][1] >= cost[i]) {
        total_cost += cost[i];
      } else {
        let value = stack.shift();
        total_cost += value[1];
        stack.unshift([s[i], cost[i]]);
      }
    }

    console.log(stack);
  }
  return total_cost;
};

let minCost4 = function (s, cost) {
  let ans = 0;
  let prev = 0;
  for (let i = 1; i < s.length; i++) {
    if (s[prev] !== s[i]) prev = i;
    else {
      ans += Math.min(cost[prev], cost[i]);
      console.log(ans);
      console.log();
      if (cost[prev] < cost[i]) prev = i;
    }
  }

  return ans;
};

var minCost5 = function (colors, neededTime) {
  let n = colors.length;
  let result = new Array(n).fill(0);

  for (let i = 1; i < n; i++) {
    if (colors[i] === colors[i - 1]) {
      minCost = Math.min(neededTime[i], neededTime[i - 1]);
      result[i] = minCost + result[i - 1]
      neededTime[i] = Math.max(neededTime[i], neededTime[i-1]);
    } else {
      result[i] = result[i] + result[i - 1]
    }
  }

  console.log(result);
  console.log(result[n - 1]);

  return result[n - 1];
};

// Main Function
minCost5("aaabbbabbbb", [3,5,10,7,5,3,5,5,4,8,1]);

// @lc code=end
