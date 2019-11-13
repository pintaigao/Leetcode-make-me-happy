/*
 * @lc app=leetcode id=117 lang=javascript
 *
 * [117] Populating Next Right Pointers in Each Node II
 */
/**
 * // Definition for a Node.
 * function Node(val,left,right,next) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 *    this.next = next;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if (root == null) {
      return null;
  }
  
  let queue = [root];
  
  while(queue.length != 0) {
      
      let size = queue.length;
      
      for (let i = 0; i < size; i++) {
          let node = queue.shift();

          if (node.left != null) {
              queue.push(node.left);
          }
          if (node.right != null) {
              queue.push(node.right);
          }

          if(i === size - 1) {
            node.next = null;
          }
          else {
            node.next = queue[0];
          }
      }
  }
  
  return root;
};
