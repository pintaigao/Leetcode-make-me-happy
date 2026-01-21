/*
 * @lc app=leetcode id=107 lang=javascript
 *
 * [107] Binary Tree Level Order Traversal II
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// var levelOrderBottom = function (root) {
//   let result = [];
//   if (!root) return result;
//   function helper(root, level) {
//     if (!root) return;
//     helper(root.left, level + 1);
//     helper(root.right, level + 1);
//     if (!result[level]) {
//       result[level] = new Array();
//     }
//     result[level].push(root.val);
//   }

//   helper(root, 0);
//   return result.reverse();
// };

// 这个解锁了新技能，bottom斜着向左
var levelOrderBottom = function (root) {
  let result = [];
  if (!root) return result;
  let queue = [root];
  while (queue.length) {
    let size = queue.length;
    let temp = new Array();
    for (let i = 0; i < size; i++) {
      let node = queue.shift();
      temp.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.unshift(temp);
  }
  return result;
};

// BFS的一般做法
var levelOrderBottom = function (root) {
  let levels = [];
  if (root == null) return levels;

  let nextLevel = [root];
  let currLevel = [];

  while (nextLevel.length !== 0) {
    currLevel = nextLevel.slice();
    nextLevel = [];
    levels.push([]);

    for (let node of currLevel) {
      // append the current node value
      levels[levels.length - 1].push(node.val);

      // process child nodes for the next level
      if (node.left != null) nextLevel.push(node.left);
      if (node.right != null) nextLevel.push(node.right);
    }
  }
  return levels.reverse();
};

// Javascript的BFS的做法
let levelOrderBottom2 = function (root) {
  if (root === null) {
    return [];
  }
  let result = [];
  let queue = [root];
  while (queue.length > 0) {
    // 这个样子就不用push什么null来确定一个level有多少了
    let size = queue.length;
    let current = [];
    for (let i = 0; i < size; i++) {
      let head = queue.shift();
      current.push(head.val);
      if (head.left !== null) {
        queue.push(head.left);
      }
      if (head.right !== null) {
        queue.push(head.right);
      }
    }
    result.unshift(current);
  }
  return result;
};

// Javascript DFS的做法
let levelOrderBottom3 = function (root) {
  const ret = [];
  next(root, 0);
  return ret.reverse(); // <-- It is better not to do this

  function next(node, index) {
    if (!node) return;
    if (!ret[index]) {
      ret[index] = [];
    }
    ret[index].push(node.val);
    next(node.left, index + 1);
    next(node.right, index + 1);
  }
};
