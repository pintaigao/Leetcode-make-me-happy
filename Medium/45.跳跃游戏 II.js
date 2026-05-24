/**
 * @param {number[]} nums
 * @return {number}
 */

// DP的解法
var jump = function (nums) {
  // 备忘录都初始化为 nums.length，相当于 INT_MAX
  // 因为从 0 跳到 n - 1 最多 n - 1 步
  let n = nums.length, memo = new Array(n).fill(n);
  function dp(p) {
    // base case
    if (p >= n - 1) {
      return 0;
    }
    // 子问题已经计算过
    if (memo[p] != n) {
      return memo[p];
    }
    let steps = nums[p];
    // 你可以选择跳 1 步，2 步...
    for (let i = 1; i <= steps; i++) {
      // 穷举每一个选择
      // 计算每一个子问题的结果
      let subProblem = dp(p + i);
      // 取其中最小的作为最终结果
      memo[p] = Math.min(memo[p], subProblem + 1);
    }
    return memo[p];
  }
  return dp(0);
}

// 贪心的解法
// 不需要真的递归穷举出所有选择的具体结果来比较求最值，而只需要每次选择那个最有潜力的局部最优解，最终就能得到全局最优解。
// Why it is Greedy？ 因为在当前这一步能覆盖到的所有位置里，我们并不急着立刻选某一个落点，而是先把这一层全部看完，找出下一步最远能扩到哪里。这样每次“跳一次”都对应扩展一整层范围，所以跳数最少。
var jump = function (nums) {
  if (nums.length <= 1) {
    return 0;
  }
  // jumps步可以跳到索引区间 [i, end], 在 [i, end] 区间内，最远可以跳到的索引是 farthest
  let n = nums.length, end = 0, jumps = 0, farthest = 0;
  for (let i = 0; i < n - 1; i++) {
    // 计算从索引 i 可以跳到的最远索引
    farthest = Math.max(nums[i] + i, farthest);
    // i === end 表示已经遍历完当前 jumps 步可以到达的索引区间
    if (i === end) {
      // [i, end] 区间是 jumps 步可达的索引范围
      // end 要更新为 farthest，表示 jumps + 1 步可以到达的最远索引范围，新的区间是 [i + 1, end]
      // 现在已经遍历完 [i, end]，所以需要再跳一步，因为要从这个区间内继续往后跳，跳一次
      end = farthest;
      jumps++;
      if (farthest >= n - 1) {
        // 如果已经可以到达终点，则可以直接返回
        return jumps;
      }
    }
  }
  // 如果无法到达终点，则返回 -1
  return -1;
};


// 练习

let canJump11 = function (nums) {
  let farthest = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i <= farthest) {
      farthest = Math.max(farthest, i + nums[i]);
    }

    if (farthest >= nums.length - 1) {
      return true;
    }
  }

  return false;
}

function canJump12(nums) {
  let jumps = 0;
  let currentEnd = 0; //当前这一跳所能覆盖的最远边界
  let farthest = 0; // 在当前范围内，下一跳最多能到哪里

  // i < nums.length - 1, 如果是i < nums.length,i会到达最后一个位置，以我们现在的逻辑，最后一个位置会判断跳不跳，但是到达最后一个位置了就不需要跳了，所以i < nums.length - 1
  for (let i = 0; i < nums.length; i++) {
    if (i == nums.length - 1) {
      return jumps; // 已经到达最后一个位置，返回跳跃次数
    }

    farthest = Math.max(farthest, i + nums[i]);

    // 说明当前这一层扫描完了 必须跳一次
    if (i === currentEnd) {
      jumps++;
      currentEnd = farthest;
    }
  }

  return jumps;
}
