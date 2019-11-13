/*
 * @lc app=leetcode id=617 lang=javascript
 *
 * [617] Merge Two Binary Trees
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {TreeNode}
 */
// var mergeTrees = function (t1, t2) {
//   if (!t1) return t2;
//   if (!t2) return t1;

//   t1.val += t2.val;

//   t1.left = mergeTrees(t1.left, t2.left);
//   t1.right = mergeTrees(t1.right, t2.right);
//   return t1;
// };


// BFS的做法
var mergeTrees = function (t1, t2) {
  if (!t1) return t2;
  let stack = new Array();
  stack.push([t1, t2]);

  while (stack.length) {
    let nodeArr = stack.shift();
    if (nodeArr[1] == null) {
      continue;
    };
    nodeArr[0].val += nodeArr[1].val;
    if (nodeArr[0].left == null) {
      nodeArr[0].left = nodeArr[1].left;
    } else {
      stack.push([nodeArr[0].left, nodeArr[1].left])
    }

    if (nodeArr[0].right == null) {
      nodeArr[0].right = nodeArr[1].right;
    } else {
      stack.push([nodeArr[0].right, nodeArr[1].right]);
    }
  }

  return t1;
};

