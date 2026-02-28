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
// BFS
var accountsMerge = function (accounts) {
  let emailToName = {}, graph = {}, seen = new Set(), ans = []; // graph是一个邻接表，emailToName是一个email到name的映射，seen是一个set来记录已经操作过的email，ans是最后的结果

  for (let account of accounts) {
    let name = "";
    console.log("Now let's see the account is: " + account);
    for (let email of account) {
      console.log("Now let's see the email is: " + email);
      if (name == "") {
        name = email;
        continue;
      }

      graph.hasOwnProperty(email) ? graph[email].push(account[1]) : graph[email] = [account[1]];
      graph.hasOwnProperty(account[1]) ? graph[account[1]].push(email) : graph[account[1]] = [email];
      emailToName[email] = name;
    }
    console.log();
  }

  for (let email in graph) {
    if (!seen.has(email)) {
      seen.add(email);
      // 用一个stack来记录路径
      let stack = [email], result = [];

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

// Union-Find
var accountsMerge2 = function (accounts) {
  // emailToIndex相当于给每个email一个唯一的id，emailToName是一个email到name的映射，emailsCount是email的总数
  let emailToIndex = {}, emailToName = {}, emailsCount = 0;
  for (const account of accounts) {
    const name = account[0]
    for (let i = 1; i < account.length; i++) {
      const email = account[i];
      if (!emailToIndex[email]) {
        emailsCount += 1;
        emailToIndex[email] = emailsCount;
        emailToName[email] = name;
      }
    }
  }

  // 每一个email 都有一个 index，找到 email 的 parent email 的 index
  const uf = new UnionFind(emailsCount + 1);
  for (const account of accounts) {
    const firstEmail = account[1], firstIndex = emailToIndex[firstEmail];
    for (let i = 2; i < account.length; i++) {
      const nextIndex = emailToIndex[account[i]];
      uf.union(firstIndex, nextIndex);
    }
  }

  let indexToEmails = {}, merged = [];
  console.log("emailToIndex:", emailToIndex);
  console.log("emailToName:", emailToName);
  console.log(uf.parent);

  for (const email in emailToIndex) {
    let index = uf.find(emailToIndex[email]), account = indexToEmails[index] ? indexToEmails[index] : [];
    account.push(email);
    indexToEmails[index] = account;
  }

  console.log(indexToEmails);

  for (const emails of Object.values(indexToEmails)) {
    emails.sort();
    const name = emailToName[emails[0]], account = [];
    account.push(name);
    account.push(...emails);
    merged.push(account);
  }
  return merged;
};

class UnionFind {
  constructor(n) {
    this.parent = new Array(n).fill(0).map((element, index) => index);
  }

  union(index1, index2) {
    this.parent[this.find(index2)] = this.find(index1);
  }

  find(index) {
    if (this.parent[index] !== index) {
      this.parent[index] = this.find(this.parent[index]);
    }
    return this.parent[index];
  }
}

// 执行区
accountsMerge2([
  ["John", "johnsmith@mail.com", "john00@mail.com"],
  ["John", "johnnybravo@mail.com"],
  ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
  ["Mary", "mary@mail.com"],
]);

