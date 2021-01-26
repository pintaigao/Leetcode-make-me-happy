/*
 * @lc app=leetcode id=987 lang=javascript
 *
 * [987] Vertical Order Traversal of a Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */

// 1. Javascript 超简短solution
var verticalTraversal = function (root) {
  const nodeInfos = []; // holds the x, y, & val information of each node traversed

  getNodeInfos(root, 0, 0);

  // sort by the following order of importance:
  //  1. x - coordinate
  //  2. y - coordinate precedence given to higher value
  //  3. node val in ascending order

  nodeInfos.sort((a, b) => a[0] - b[0] || b[1] - a[1] || a[2] - b[2]);

  const map = new Map();

  for (const [x, y, val] of nodeInfos) {
    if (!map.has(x)) map.set(x, []);
    map.get(x).push(val);
  }

  return [...map.values()];

  function getNodeInfos(node, x, y) {
    if (node) {
      getNodeInfos(node.left, x - 1, y - 1); // traverse left
      nodeInfos.push([x, y, node.val]);
      getNodeInfos(node.right, x + 1, y - 1); // traverse right
    }
  }
};

// 2. 较正常DFS的思路
var verticalTraversal = function (root) {
  const nodeMap = {};
  dfs(root, 0, 0, nodeMap);

  //sort map by x axis
  const xKeys = Object.keys(nodeMap).sort((a, b) => a - b);
  const res = [];
  for (let x of xKeys) {
    let xyArray = [];
    //sort each subarray by yAxis from large to small
    const yKeys = Object.keys(nodeMap[x]).sort((m, n) => n - m);
    for (let y of yKeys) {
      //if values have same xAxis && yAxis , value form small to large
      let valueArray = nodeMap[x][y].sort((c, d) => c - d);
      xyArray = xyArray.concat(valueArray);
    }
    res.push(xyArray);
  }

  return res;
};

const dfs = (node, x, y, m) => {
  if (!node) return;
  if (!m[x]) {
    m[x] = {};
    m[x][y] = [];
  } else if (!m[x][y]) {
    m[x][y] = [];
  }

  m[x][y].push(node.val);

  dfs(node.left, x - 1, y - 1, m);
  dfs(node.right, x + 1, y - 1, m);
};
// @lc code=end
