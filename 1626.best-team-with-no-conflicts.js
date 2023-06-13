/*
 * @lc app=leetcode id=1626 lang=javascript
 *
 * [1626] Best Team With No Conflicts
 */

// @lc code=start
/**
 * @param {number[]} scores
 * @param {number[]} ages
 * @return {number}
 */
var bestTeamScore = function (scores, ages) {
  let persons = new Array(scores.length);

  // 创建一个二维数组，保存队员的分数和年龄
  for (let i = 0; i < scores.length; i++) {
    persons[i] = [scores[i], ages[i]];
  }


  // 根据年龄升序->分数升序对队员进行排序
  persons.sort((a, b) => a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0]);

  /* 创建一个长度为4的数组dp，用于存储每个队员作为最后一个队员时的最大分数总和。 */
  let dp = new Array(scores.length);
  dp[0] = persons[0][0];
  let ans = dp[0];

  /* 原理： 这个array已经按照年龄升序了，所以从第二个人开始，往前看，看看前面这些人的分数是不是小于等于这个人的分数，如果是：max更新为（max和dp[j]的最大值） */
  for (let i = 1; i < scores.length; i++) {
    let max = 0;
    for (let j = 0; j < i; j++) {
      // 找到分数比当前队员低的队员，并记录它们中的最大值
      if (persons[j][0] <= persons[i][0]) {
        max = Math.max(max, dp[j]);
      }
    }

    dp[i] = persons[i][0] + max;
    ans = Math.max(ans, dp[i]);
  }

  return ans;
};

// 测试样例
const scores = [1, 3, 5, 10];
const ages = [1, 2, 3, 4];
console.log(bestTeamScore(scores, ages)); // 输出：16
// @lc code=end

