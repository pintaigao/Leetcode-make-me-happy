/*
 * @lc app=leetcode id=988 lang=javascript
 *
 * [988] Smallest String Starting From Leaf
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
 * @return {string}
 */
var smallestFromLeaf = function(root) {
  var result = null;
  var word;
  
  var traverse = function(node, letters) {
      if (!node) {
          return;
      }
      
      letters.push(node.val);
      if (!node.left && !node.right) {
          word = letters.slice(0).reverse().map(x => String.fromCharCode(x + 97)).join("");
          if (!result || result.localeCompare(word) === 1) {
              result = word;
          }
      } else {
          traverse(node.left, letters);
          traverse(node.right, letters);
      }
      
      letters.pop();
  };
  traverse(root, []);
  
  return result;
};

