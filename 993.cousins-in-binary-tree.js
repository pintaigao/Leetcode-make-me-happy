/*
 * @lc app=leetcode id=993 lang=javascript
 *
 * [993] Cousins in Binary Tree
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
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
// DFS Solution
var isCousins = function (root, x, y) {
  let recordedDepth = -1;
  let isCousin = false;

  var dfs = function (node, depth) {
    if (node == null) {
      return false;
    }

    // 如果recoredDepth不为-1，而新的传进来的depth和recoredDepth不相等，说明不是同一层
    if (recordedDepth != -1 && depth > recordedDepth) {
      return false;
    }

    if (node.val == x || node.val == y) {
      if (recordedDepth == -1) {
        // Save depth for the first node found.
        recordedDepth = depth;
      }

      // Return true, if the second node is found at the same depth.
      return depth == recordedDepth;
    }

    let left = dfs(node.left, depth + 1);
    let right = dfs(node.right, depth + 1);

    // this.recordedDepth != depth + 1 would ensure node x and y are not
    // immediate child nodes, otherwise they would become siblings.
    if (left && right && recordedDepth != depth + 1) {
      isCousin = true;
    }

    // true表示这个root的left或right找到了x或者y
    return left || right;
  };

  dfs(root, 0);

  return isCousin;
};

// BFS Solution
var isCousins2 = function (root, x, y) {
  const bfs = (queue) => {
    while (queue.length > 0) {
      let new_queue = [];
      let { X, Y } = {};
      // 用queue的好处确保了每一个queue里面的node都是同一层的
      for (let [node, parent] of queue) {
        if (node.val === x) X = parent;
        if (node.val === y) Y = parent;
        if (X && Y && X !== Y) return true;
        // new_queue push的是node都是下同一层的
        if (node.left) new_queue.push([node.left, node]);
        if (node.right) new_queue.push([node.right, node]);
      }
      queue = new_queue;
    }
    return false;
  };

  // [node, parent]
  return bfs([[root, null]]);
};
// @lc code=end
