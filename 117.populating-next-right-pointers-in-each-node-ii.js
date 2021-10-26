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

// Approach 1: Level Order Traversal
var connect = function (root) {
  if (root == null) {
    return null;
  }

  let queue = [root];

  while (queue.length != 0) {
    let size = queue.length;

    for (let i = 0; i < size; i++) {
      let node = queue.shift();

      if (node.left != null) {
        queue.push(node.left);
      }
      if (node.right != null) {
        queue.push(node.right);
      }

      if (i < size - 1) {
        node.next = queue[0];
      }
    }
  }

  return root;
};

// Approach 2: Using previously established next pointers
let connect = function (root) {
  let prev, leftmost;

  if (root == null) {
    return root;
  }

  let processChild = function (childNode) {
    if (childNode != null) {
      // If the "prev" pointer is alread set i.e. if we
      // already found atleast one node on the next level,
      // setup its next pointer
      if (prev != null) {
        prev.next = childNode;
      } else {
        // Else it means this child node is the first node
        // we have encountered on the next level, so, we
        // set the leftmost pointer
        leftmost = childNode;
      }

      prev = childNode;
    }
  };

  // The root node is the only node on the first level
  // and hence its the leftmost node for that level
  leftmost = root;

  // Variable to keep track of leading node on the "current" level
  let curr = leftmost;

  // We have no idea about the structure of the tree,
  // so, we keep going until we do find the last level.
  // the nodes on the last level won't have any children
  while (leftmost != null) {
    // "prev" tracks the latest node on the "next" level
    // while "curr" tracks the latest node on the current
    // level.
    prev = null;
    curr = leftmost;

    // We reset this so that we can re-assign it to the leftmost
    // node of the next level. Also, if there isn't one, this
    // would help break us out of the outermost loop.
    leftmost = null;

    // Iterate on the nodes in the current level using
    // the next pointers already established.
    while (curr != null) {
      // Process both the children and update the prev
      // and leftmost pointers as necessary.
      processChild(curr.left);
      processChild(curr.right);

      // Move onto the next node.
      curr = curr.next;
    }
  }

  return root;
};
