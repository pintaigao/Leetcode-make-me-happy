/*
 * @lc app=leetcode id=863 lang=javascript
 *
 * [863] All Nodes Distance K in Binary Tree
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function (root, target, k) {
  // 记录父节点：node.val -> parentNode
  // 题目说了树中所有节点值都是唯一的，所以可以用 node.val 代表 TreeNode
  // 开始从 target 节点施放 BFS 算法，找到距离为 k 的节点
  // 记录离 target 的距离
  let parent = {}, q = [target], visited = new Set([target.val]), dist = 0, res = [];

  // 遍历所有节点，记录每个节点的父节点
  function traverse(node, parentNode) {
    if (node === null) return;
    parent[node.val] = parentNode;
    // 二叉树递归框架
    traverse(node.left, node);
    traverse(node.right, node);
  }

  traverse(root, null);

  while (q.length > 0) {
    let sz = q.length;
    for (let i = 0; i < sz; i++) {
      let cur = q.shift();
      if (dist === k) {
        // 找到距离起点 target 距离为 k 的节点
        res.push(cur.val);
      }
      // 向父节点、左右子节点扩散
      let parentNode = parent[cur.val];
      if (parentNode !== null && !visited.has(parentNode.val)) {
        visited.add(parentNode.val);
        q.push(parentNode);
      }
      if (cur.left !== null && !visited.has(cur.left.val)) {
        visited.add(cur.left.val);
        q.push(cur.left);
      }
      if (cur.right !== null && !visited.has(cur.right.val)) {
        visited.add(cur.right.val);
        q.push(cur.right);
      }
    }
    // 向外扩展一圈
    dist++;
  }

  return res;
};
// @lc code=end

