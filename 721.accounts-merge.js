/*
 * @lc app=leetcode id=721 lang=javascript
 *
 * [721] Accounts Merge
 */

// @lc code=start
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
// DFS, Union Find
var accountsMerge = function (accounts) {
  let emailToName = {};
  let graph = {};

  for (let account of accounts) {
    let name = "";
    console.log("Now let's see the account is: " + account);
    for (let email of account) {
      console.log("Now let's see the email is: " + email);
      if (name == "") {
        name = email;
        continue;
      }

      // 把
      if (!graph.hasOwnProperty(email)) {
        graph[email] = [account[1]];
      } else {
        graph[email].push(account[1]);
      }

      if (!graph.hasOwnProperty(account[1])) {
        graph[account[1]] = [email];
      } else {
        graph[account[1]].push(email);
      }

      emailToName[email] = name;
    }
    console.log();
  }

  // console.log(emailToName);
  // console.log();
  console.log(graph);

  // 最主要是这个Seen来排除已经操作过的email
  let seen = new Set();
  let ans = [];

  for (let email in graph) {
    if (!seen.has(email)) {
      seen.add(email);
      // 用一个stack来记录路径
      let stack = [email];

      let result = [];
      while (stack.length !== 0) {
        let node = stack.shift();
        result.push(node);

        for (let nei of graph[node]) {
          if (!seen.has(nei)) {
            seen.add(nei);
            stack.unshift(nei);
          }
        }
      }

      result.sort();

      result.unshift(emailToName[email]);
      ans.push(result);
    }
  }

  console.log("Let's see the result");
  console.log(ans);
  return ans;
};

accountsMerge([
  ["John", "johnsmith@mail.com", "john00@mail.com"],
  ["John", "johnnybravo@mail.com"],
  ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
  ["Mary", "mary@mail.com"],
]);
// @lc code=end
