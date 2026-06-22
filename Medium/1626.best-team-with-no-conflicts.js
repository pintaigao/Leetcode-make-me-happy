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
  for (let i = 0; i < scores.length; i++) { persons[i] = [scores[i], ages[i]] }
  // 根据年龄升序->分数升序对队员进行排序
  persons.sort((a, b) => a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0]);

  /* 创建一个长度为4的数组dp，用于存储每个队员作为最后一个队员时的最大分数总和。 */
  let dp = new Array(scores.length);
  dp[0] = persons[0][0];
  let ans = dp[0];

  /* 原理： 这个array已经按照年龄升序了，所以从第二个人开始，从头开始对比，看看前面这些人的分数是不是小于等于这个人的分数，如果是：max更新为（max和dp[j]的最大值） */
  for (let i = 1; i < scores.length; i++) {
    let max = 0;
    for (let j = 0; j < i; j++) {
      // 从头看，先保证了年龄绝对小于等于现在停的位置
      // 找到分数比当前队员低的队员，并记录它们中的最大值
      // 每个位置上的值一定是之前已经对比好了的
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
// const scores = [1, 3, 5, 10];
// const ages = [1, 2, 3, 4];
// console.log(bestTeamScore(scores, ages)); // 输出：16
// @lc code=end
let bestTeamScore10 = function (scores, ages) {
  let persons = new Array(scores.length), path = [], res = 0
  // 创建一个二维数组，保存队员的分数和年龄
  for (let i = 0; i < scores.length; i++) { persons[i] = [scores[i], ages[i]] }
  // 根据年龄升序->分数升序对队员进行排序
  persons.sort((a, b) => a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0]);
  console.log(persons);

  function traveler(start) {
    if (start == scores.length) {
      let tempRes = 0
      path.forEach((item) => tempRes = tempRes + item[0])
      console.log(tempRes);
      res = Math.max(res, tempRes);
      return;
    }

    for (let i = start; i < scores.length; i++) {
      let flag = false;
      // 排序之后，当前人的 age 不可能小于 path 最后一个人的 age。所以省略年龄比较
      if (!path.length || path[path.length - 1][0] <= persons[i][0]) {
        flag = true;
        path.push(persons[i]);
        console.log(path);

      }
      traveler(i + 1)
      if (flag) {
        path.pop();
      }
    }
  }
  traveler(0);
  console.log(res);
}

let bestTeamScore11 = function (scores, ages) {
  let persons = new Array(scores.length), path = [], res = 0
  // 创建一个二维数组，保存队员的分数和年龄
  for (let i = 0; i < scores.length; i++) { persons[i] = [scores[i], ages[i]] }
  // 根据年龄升序->分数升序对队员进行排序
  persons.sort((a, b) => a[1] !== b[1] ? a[1] - b[1] : a[0] - b[0]);
  console.log(persons);

  function traveler(start) {
    console.log("start is: " + start);
    console.log(path);

    if (start == scores.length) {
      let tempRes = 0
      path.forEach((item) => tempRes = tempRes + item[0])
      res = Math.max(res, tempRes);
      return;
    }

    // 选择
    if (!path.length || path[path.length - 1][0] <= persons[start][0]) {
      path.push(persons[start]);
      traveler(start + 1)
      path.pop()
    }
    // 不选择
    traveler(start + 1)
  }

  traveler(0);

  console.log(res);

}

bestTeamScore11([2, 1, 2, 1], [4, 5, 6, 5])
// bestTeamScore11([722, 235, 424, 711, 508, 881, 21, 126, 828, 679, 826, 264, 318, 284, 778, 409, 658, 10, 502, 609, 452, 552, 45, 926, 376, 229, 463], [10, 95, 26, 25, 16, 58, 90, 84, 47, 17, 31, 54, 7, 10, 63, 25, 65, 16, 31, 57, 24, 13, 81, 36, 1, 25, 6])

// 改良版 brute force DFS （选择和不选择）
var bestTeamScore12 = function (scores, ages) {
  let n = scores.length, persons = [];

  for (let i = 0; i < n; i++) {
    persons.push([scores[i], ages[i]]);
  }

  // [score, age]
  persons.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  const memo = new Map();

  function dfs(index, prevIndex) {
    if (index === n) {
      return 0;
    }

    const key = index + "," + prevIndex;

    if (memo.has(key)) {
      return memo.get(key);
    }

    // Choice 1: skip current player
    let best = dfs(index + 1, prevIndex);

    // Choice 2: take current player if valid
    if (prevIndex === -1 || persons[prevIndex][0] <= persons[index][0]) {
      best = Math.max(best, persons[index][0] + dfs(index + 1, index));
    }

    memo.set(key, best);
    return best;
  }

  return dfs(0, -1);
};

// memo dfs for loop 的方法
var bestTeamScore13 = function (scores, ages) {
  const n = scores.length, persons = [];

  for (let i = 0; i < n; i++) {
    persons.push([scores[i], ages[i]]);
  }

  // persons[i] = [score, age]
  // sort by age first, then score
  persons.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  const memo = new Map();

  function dfs(start, prevIndex) {
    const key = start + "," + prevIndex;

    if (memo.has(key)) {
      return memo.get(key);
    }

    let best = 0;

    for (let i = start; i < n; i++) {
      if (prevIndex === -1 || persons[prevIndex][0] <= persons[i][0]) {
        best = Math.max(best, persons[i][0] + dfs(i + 1, i));
      }
    }

    memo.set(key, best);
    return best;
  }

  return dfs(0, -1);
};