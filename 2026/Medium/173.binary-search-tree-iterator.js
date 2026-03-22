/*
 * @lc app=leetcode id=173 lang=javascript
 *
 * [173] Binary Search Tree Iterator
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
 */
// var BSTIterator = function (root) {
//   this.root = root;
//   this.vals = [];
//   this.len = 0;
// };

// /**
// * @return the next smallest number
// * @return {number}
// */
// BSTIterator.prototype.next = function () {
//   const populateBSTArray = (result, n) => {
//     if (n === null) {
//       return;
//     }

//     if (n.left === null && n.right === null) {
//       result.push(n.val);
//       return result;
//     }

//     populateBSTArray(result, n.left);
//     result.push(n.val);
//     populateBSTArray(result, n.right);

//     return result;
//   }

//   if (this.vals.length === 0) {
//     this.vals = populateBSTArray([], this.root);
//   }

//   if (this.len < this.vals.length) {
//     let i = this.len;
//     this.len++;
//     return this.vals[i];
//   } else {
//     return null;
//   }
// };

// /**
// * @return whether we have a next smallest number
// * @return {boolean}
// */
// BSTIterator.prototype.hasNext = function () {
//   return (this.len === 0 && this.vals.length === 0 && this.root !== null)
//     || this.len < this.vals.length;
// };

var BSTIterator = function (root) {
  this.queue = [];

  let helper = (root) => {
    if (root === null) {
      return;
    }
    helper(root.left);
    this.queue.push(root.val);
    helper(root.right);
  };

  helper(root);
};

/**
 * @return the next smallest number
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  return this.queue.shift();
};

/**
 * @return whether we have a next smallest number
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.queue.length > 0;
};
