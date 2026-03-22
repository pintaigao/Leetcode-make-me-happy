/*
 * @lc app=leetcode id=257 lang=javascript
 *
 * [257] Binary Tree Paths
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
 * @return {string[]}
 */

var binaryTreePaths = function (root) {
  // “To solve this problem, I’ll use a depth-first search (DFS) approach to explore all paths from the root to the leaf nodes.”
  if (!root) return [];

  // “I’ll create a result array to collect all root-to-leaf paths.”
  // “I’ll also maintain a path array to keep track of the current path from the root to the current node during the DFS traversal.”
  let result = [], path = [];

  // “I’ll define a helper function called dfs that takes a node as an argument. This function will perform the DFS traversal.”
  function dfs(node) {
    // “If the current node is null, I’ll simply return from the function since there’s nothing to explore.”
    if (!node) return;

    // “When I visit a node, I’ll add its value to the path array.”
    path.push(node.val);

    // “If the current node is a leaf node (i.e., it has no left or right children), I’ll join the values in the path array with '->' and add the resulting string to the result array.”
    if (node.left === null && node.right === null) {
      result.push(path.join("->"));
    }

    // “I’ll recursively call dfs on the left and right children of the current node, passing along the updated path.”
    dfs(node.left);
    dfs(node.right);

    // “After exploring both children, I’ll backtrack by removing the current node’s value from the path.”
    path.pop();
  }

  // “Finally, I’ll kick off the DFS traversal starting from the root node with an empty path.”
  dfs(root);

  // “Once the DFS is complete, the result array will contain all root-to-leaf paths, which I can return.”
  return result;
}

// BFS
// “Alternatively, I can also solve this problem using a breadth-first search (BFS) approach. In BFS, I’ll use a queue to explore all paths level by level from the root to the leaf nodes.”
// “I’ll initialize a queue with the root node and its corresponding path as a string. Then, I’ll repeatedly dequeue elements from the queue, checking if they are leaf nodes. If they are, I’ll add their paths to the result array. If not, I’ll enqueue their children along with their updated paths.”
// “This BFS approach will also yield the same result as the DFS approach, but it explores the tree in a different order.”
// “Here’s how the BFS implementation looks in code:”
var binaryTreePaths = function (root) {
  // if node is null, return an empty array
  if (!root) return [];

  // initialize a result array to store the paths and a queue for BFS
  // the queue will store pairs of [node, path] where path is the string representation of the path from the root to that node
  let result = [], queue = [[root, root.val.toString()]];
  // “Now I start the BFS loop. As long as the queue is not empty, I keep processing nodes.”
  while (queue.length > 0) {
    // “For each dequeued element, check if the node is a leaf node. If it is, add its path to the result array. If not, enqueue its left and right children (if they exist) along with their corresponding paths.”
    let [node, path] = queue.shift();
    // “If the current node is a leaf node (i.e., it has no left or right children), I’ll add its path to the result array.”
    if (node.left === null && node.right === null) {
      // “I’ll join the values in the path array with '->' and add the resulting string to the result array.”
      result.push(path);
    }

    //“If the left child exists, I enqueue the left child together with the updated path. That way, when I process that child later, I already know its full path prefix.”
    if (node.left) {
      queue.push([node.left, path + "->" + node.left.val.toString()]);
    }

    // I do the same for the right child, enqueueing the node together with its updated path.
    if (node.right) {
      // “I’ll enqueue the right child along with its path, which is the current path plus '->' and the right child’s value.”
      queue.push([node.right, path + "->" + node.right.val.toString()]);
    }
  }

  // “Once the BFS is complete, the result array will contain all root-to-leaf paths, which I can return.”
  return result;
}
// @lc code=end
