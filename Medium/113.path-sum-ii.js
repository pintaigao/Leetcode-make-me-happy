/*
 * @lc app=leetcode id=113 lang=javascript
 *
 * [113] Path Sum II
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
 * @param {number} targetSum
 * @return {number[][]}
 */

/* DFS */
var pathSum = function (root, targetSum) {
  let result = [];
  let path = [];

  let dfs = (root, targetSum) => {
    if (root == null) {
      return;
    }

    path.push(root.val);
    targetSum -= root.val;
    if (root.left == null && root.right == null && targetSum == 0) {
      result.push(path.slice());
    }
    dfs(root.left, targetSum);
    dfs(root.right, targetSum);
    path.pop();
  }

  dfs(root, targetSum);
  return result;
};

/* BFS */
var pathSum = function (root, targetSum) {
  if (root == null) {
    return ret;
  }

  let getPath = (node) => {
    let temp = [];
    while (node != null) {
      temp.unshift(node.val);
      node = map[node];
    }
    result.push(temp);
  }

  let result = [], map = {}, queueNode = [root], queueSum = [0];

  while (queueNode.length) {
    let node = queueNode.shift();
    let rec = queueSum.shift() + node.val;

    if (node.left == null && node.right == null) {
      if (rec == targetSum) {
        getPath(node);
      }
    } else {
      if (node.left != null) {
        map[node.left] = node;
        queueNode.push(node.left);
        queueSum.push(rec);
      }
      if (node.right != null) {
        map[node.right] = node;
        queueNode.push(node.right);
        queueSum.push(rec);
      }
    }
  }

  return result;
};
// @lc code=end

// 练习
var pathSum10 = function (root, targetSum) {
  let res = [], path = [];

  function traverse(root, value) {
    if (!root) return;

    if (value == 0 && root.left == null && root.right == null) {
      path.push(root.val)
      res.push([...path]);
      path.pop(root.value);
      return;
    }

    path.push(root.val)
    traverse(root.left, value - root.val)
    traverse(root.right, value - root.val)
    path.pop()
  }

  traverse(root, targetSum - root.val);

  return res;
};

