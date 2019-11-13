/*
 * @lc app=leetcode id=254 lang=javascript
 *
 * [254] Factor Combinations
 */
/**
 * @param {number} n
 * @return {number[][]}
 */
// var getFactors = function (n) {
//   let res = [];
//   dfs(res, n, [], 2);
//   return res;
// };

// function dfs(res, n, list, start) {
//   if (n == 1) {
//     if (list.length > 1) res.push(list.slice());
//     return;
//   }

//   for (let i = start; i <= Math.floor(Math.sqrt(n)); i++) {
//     if (n % i == 0) {
//       list.push(i);
//       dfs(res, n / i, list, i);

//       list.push(n / i);
//       res.push(list.slice());

//       list.pop();
//       list.pop();
//     }
//   }
// }

var getFactors = function (n) {

  let result = [];

  function helper(n, startNumber, tempResult) {
    for (let i = startNumber; i * i <= n; i++) {
      if (n % i === 0) {
        tempResult.push(i);
        tempResult.push(Math.floor(n / i));
        result.push(tempResult.slice());
        tempResult.pop();
        helper(Math.floor(n / i), i, tempResult);
        tempResult.pop();
      }
    }
  }
  helper(n, 2, []);
  return result;
}

