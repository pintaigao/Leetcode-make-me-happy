/*
 * @lc app=leetcode id=1578 lang=javascript
 *
 * [1578] Minimum Deletion Cost to Avoid Repeating Letters
 * Array, String, Dynamic Programming, Greedy
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number[]} cost
 * @return {number}
 */

// 转换下思路：delete the same char group but leave only one max cost char
/* Solution 1 */
/* 遇到这个位置的char和前面的char不同就讨论前面的情况 */
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

    sum_cost += cost[i];
    max_cost = Math.max(max_cost, cost[i]);
  }

  res += sum_cost - max_cost;
  return res;
};

/* Solution 2 */
let minCost2 = function (s, cost) {
  let n = s.length;
  let result = 0;
  for (let i = 1; i < n; i++) {
    if (s[i] == s[i - 1]) {
      result = result + Math.min(cost[i], cost[i - 1]);
      cost[i] = Math.max(cost[i], cost[i - 1]);
    }
  }

  console.log(result);
  return result;
};

minCost2("abaac", [1, 2, 3, 4, 1]);

// Solution 3: Stack
let minCost3 = function (s, cost) {
  let stack = [];
  let total_cost = 0;
  for (let i = 0; i < s.length; i++) {
    console.log("Current char: " + s[i]);
    if (stack.length === 0 || stack[stack.length - 1][0] !== s[i]) {
      stack.unshift([s[i], cost[i]]);
      console.log("Stack: " + stack);
    } else {
      if (stack[stack.length - 1][1] >= cost[i]) {
        console.log(stack[stack.length - 1][1] + " >= " + cost[i]);
        total_cost += cost[i];
      } else {
        let value = stack.shift();
        console.log("value: " + value);
        total_cost += value[1];
        stack.unshift([s[i], cost[i]]);
        console.log("Stack: " + stack);
      }
    }
    console.log();
  }

  console.log(total_cost);
  return total_cost;
};

minCost3("abaac", [1, 2, 3, 4, 1]);

/* Solution 4 */
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

/* Solution 5 */
/* Two Pointer, L allways point to the current max one */
let minCost5 = function (s, cost) {
  // No need to check, already colorful
  if (s.length === 1) {
    return 0;
  }

  // Variable `l` and `r` are two pointers
  let out = 0;
  let l = 0;
  let r = 1;

  // Loop through the balloons
  while (r < s.length) {
    // If the color on `l` and `r` are different, move `l` to `r`, reset 'l'
    if (s[l] !== s[r]) {
      l = r;
    } else {
      // Color on `l` and `r` are the same, pick the smaller one
      out += Math.min(cost[l], cost[r]);

      // Move `l` to `r` when cost to remove `l` is less than cost to remove `r`
      if (cost[l] < cost[r]) {
        l = r;
      }
    }

    // Always increment `r`
    r++;
  }

  return out;
};

/* Fastest Solution */
var minCost6 = function (s, cost) {
  let result = 0;
  let sum = cost[0];
  let max = cost[0];
  for (let i = 1; i <= colors.length; i++) {
    if (colors[i] === colors[i - 1]) {
      sum += cost[i];
      max = Math.max(max, cost[i]);
    } else {
      // 只保留一个
      result += sum - max;
      // Reset sum and max
      sum = cost[i];
      max = cost[i];
    }
  }
  return result;
};
// @lc code=end
