/*
 * @lc app=leetcode id=116 lang=javascript
 *
 * [116] Populating Next Right Pointers in Each Node
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
// var connect = function (root) {
//   if(!root) {
//     return;
//   }
//   let queue = [root];

//   while (queue.length) {
//     let length = queue.length;
//     for (let i = 0; i < length; i++) {
//       let node = queue.shift();
      
//         queue.push(node.left? node.left:null);
      

//       if(node.right) {
//         queue.push(node.right?node.right:null);
//       }

//       if (i === length - 1) {
//         node.next = null;
//       } else {
//         node.next = queue[0];
//       }
//     }
//   }
//   return root;
// };

var connect = function(root) {
  if(!root) return;
  const queue = [root];
  
  while(queue.length) {
      const size  = queue.length;
      const level = queue.slice();

      for(let i = 0; i < size; i++) {
          const currentNode = queue.shift();
          currentNode.next  = level[i + 1];
          if(currentNode.left)  queue.push(currentNode.left);
          if(currentNode.right) queue.push(currentNode.right);
      }
  }
};

