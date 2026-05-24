var accountsMerge = function (accounts) {
  // key: email, value: 出现该 email 的 account 的索引列表
  let emailToIndexes = {};
  for (let i = 0; i < accounts.length; i++) {
    let account = accounts[i];
    for (let j = 1; j < account.length; j++) {
      let email = account[j];
      emailToIndexes[email] ? emailToIndexes[email].push(i) : emailToIndexes[email] = [i];
    }
  }

  // 计算合并后的账户
  let res = [], visitedEmails = new Set();
  console.log(emailToIndexes);


  for (let email of Object.keys(emailToIndexes)) {
    if (visitedEmails.has(email)) {
      continue;
    }
    // 合并账户，用 BFS 算法穷举所有和 email 相关联的邮箱
    let mergedEmail = [], q = [email];
    visitedEmails.add(email);
    // BFS 算法框架
    while (q.length > 0) {
      let curEmail = q.shift();
      mergedEmail.push(curEmail);
      let indexes = emailToIndexes[curEmail];
      for (let index of indexes) {
        let account = accounts[index];
        for (let j = 1; j < account.length; j++) {
          let nextEmail = account[j];
          if (!visitedEmails.has(nextEmail)) {
            q.push(nextEmail);
            visitedEmails.add(nextEmail);
          }
        }
      }
    }

    // mergedEmail 是 userName 的所有邮箱
    mergedEmail.sort();
    mergedEmail.unshift(accounts[emailToIndexes[email][0]][0]);
    res.push(mergedEmail);
  }
  return res;
};

accountsMerge([["John", "johnsmith@mail.com", "john00@mail.com"], ["John", "johnnybravo@mail.com"], ["John", "johnsmith@mail.com", "john_newyork@mail.com"], ["Mary", "mary@mail.com"]])

// Union Find
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */
var accountsMerge2 = function (accounts) {
  // emailToIndex相当于给每个email一个唯一的id，emailToName是一个email到name的映射，emailsCount是email的总数
  let emailToId = {}, emailToName = {}, emailsCount = 0;
  for (const account of accounts) {
    for (let i = 1; i < account.length; i++) {
      if (!emailToId[account[i]]) {
        emailsCount += 1;
        emailToId[account[i]] = emailsCount;
        emailToName[account[i]] = account[0];
      }
    }
  }

  // 每一个email 都有一个 index，找到 email 的 parent email 的 index
  let uf = new UnionFind(emailsCount), indexToEmails = {}, merged = [];
  for (const account of accounts) {
    for (let i = 2; i < account.length; i++) {
      uf.union(emailToId[account[1]], emailToId[account[i]]);
    }
  }

  for (const [email, id] of Object.entries(emailToId)) {
    let root = uf.find(id);
    // indexToEmails[root] ? indexToEmails[root].push(email) : indexToEmails[root] = [email];
    indexToEmails[root] = indexToEmails[root] ? [...indexToEmails[root], email] : [email];
  }

  for (const emails of Object.values(indexToEmails)) {
    merged.push([emailToName[emails[0]], ...emails.sort()]);
  }
  return merged;
};

class UnionFind {
  constructor(n) {
    // index 代表他们的值，parent 代表他们的 parent 的 index
    this.parent = new Array(n).fill(0).map((element, index) => index);
  }

  // index1 代表 root，index2 代表 child，简单点想 index2 连接到 index1 上
  union(index1, index2) {
    this.parent[this.find(index2)] = this.find(index1);
  }

  find(index) {
    if (this.parent[index] !== index) {
      this.parent[index] = this.find(this.parent[index]);
    }
    return this.parent[index];
  }
};