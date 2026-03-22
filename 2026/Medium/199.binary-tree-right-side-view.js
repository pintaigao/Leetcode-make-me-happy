/*
 * @lc app=leetcode id=199 lang=javascript
 *
 * [199] Binary Tree Right Side View
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
 * @return {number[]}
 */

/* BFS的做法 */
var rightSideView = function (root) {
  if (root == null) return [];

  let nextLevel = [root];
  let [currLevel, result] = [[], []];

  let node = null;
  while (nextLevel.length !== 0) {
    // prepare for the next level
    currLevel = [...nextLevel];
    nextLevel = [];

    while (currLevel.length !== 0) {
      node = currLevel.shift();
      // add child nodes of the current level
      // in the queue for the next level
      if (node.left != null) nextLevel.push(node.left);
      if (node.right != null) nextLevel.push(node.right);
    }

    // The current level is finished.
    // Its last element is the rightmost one.
    if (currLevel.length == 0) result.push(node.val);
  }
  return result;
};

/* BFS 记录深度的方法 */
var rightSideView = function (root) {
  let res = [];
  if (root == null) {
    return res;
  }
  let queue = [root];
  while (queue.length) {
    // 提前记录新一层的长度
    let size = queue.length;
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
      if (i == size - 1) {
        //将当前层的最后一个节点放入结果列表
        res.push(node.val);
      }
    }
  }
  return res;
};

/* DFS 的做法 */
let rightSideView = function (root) {
  let rightside = [];

  if (root == null) return rightside;

  let helper = function (node, level) {
    if (level == rightside.length) {
      rightside.push(node.val);
    }

    if (node.right != null) helper(node.right, level + 1);
    if (node.left != null) helper(node.left, level + 1);
  };

  helper(root, 0);
  return rightside;
};

// @lc code=end
