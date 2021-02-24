/*
 * @lc app=leetcode id=261 lang=javascript
 *
 * [261] Graph Valid Tree
 */
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
class UnionFind {
  constructor(n) {
    this.list = new Array(n).fill(0).map((_, index) => index);
    this.length = n;
    console.log(this.list);
    console.log(this.length);
    console.log();
  }

  // find root
  find(index) {
    while (this.list[index] !== index) {
      index = this.list[this.list[index]];
    }

    return index;
  }

  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);
    console.log(rootA);
    console.log(rootB);

    if (rootA === rootB) return false;

    // edges[0]的root设置为edges[1]
    this.list[rootA] = rootB;
    console.log(this.list);
    // Exactly n-1 edge
    this.length--;
    return true;
  }

  get size() {
    return this.length;
  }
}
var validTree = function (n, edges) {
  const uf = new UnionFind(n);

  for (let i = 0; i < edges.length; i++) {
    let [a, b] = edges[i];
    if (!uf.union(a, b)) {
      return false;
    }
    console.log();
  }

  return uf.size === 1;
};

// validTree(5, [
//   [0, 1],
//   [0, 2],
//   [0, 3],
//   [1, 4],
// ]);
// validTree(5, [[0,1], [1,2], [2,3], [1,3], [1,4]]);
// validTree(6, [
//   [0, 2],
//   [4, 1],
//   [2, 3],
//   [3, 5],
//   [1, 3],
// ]);

// 2.DFS
var validTree2 = function (n, edges) {
  let adjacencyList = [];
  for (let i = 0; i < n; i++) {
    adjacencyList.push([]);
  }
  for (let edge of edges) {
    adjacencyList[edge[0]].push(edge[1]);
    adjacencyList[edge[1]].push(edge[0]);
  }

  // [ [ 2 ], [ 4, 3 ], [ 0, 3 ], [ 2, 5, 1 ], [ 1 ], [ 3 ] ]
  console.log(adjacencyList);

  // parent的规则，从key(edge[1])到value(edge[0])
  let parent = {};
  parent[0] = -1;
  let stack = [];
  stack.unshift(0);

  while (stack.length !== 0) {
    let node = stack.shift();
    console.log(
      "Now let's see the node: " +
        node +
        " and its list: " +
        adjacencyList[node]
    );
    for (let neighbour of adjacencyList[node]) {
      if (parent[node] == neighbour) {
        continue;
      }
      if (parent.hasOwnProperty(neighbour)) {
        return false;
      }
      stack.unshift(neighbour);
      parent[neighbour] = node;
    }
    console.log(parent);
    console.log(stack);
    console.log();
  }

  return Object.keys(parent).length == n;
};

validTree2(6, [
  [0, 2],
  [4, 1],
  [2, 3],
  [3, 5],
  [1, 3],
  [4, 2],
]);

// 3.BFS
