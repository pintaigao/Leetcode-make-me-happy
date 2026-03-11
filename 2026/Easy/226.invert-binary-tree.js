/*
 * @lc app=leetcode id=226 lang=javascript
 *
 * [226] Invert Binary Tree
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
 * @return {TreeNode}
 */

/* DFS 后序遍历
  时间复杂度：O(n)，其中 n 是二叉树的节点个数。每个节点被访问一次。
  空间复杂度：O(n)，其中 n 是二叉树的节点个数。最坏情况下，二叉树退化成链表，递归调用栈的深度为 n。
*/
var invertTree = function (root) {
  // 主函数
  // 遍历二叉树，交换每个节点的子节点
  traverse(root);
  return root;
};

// 二叉树遍历函数
function traverse(root) {
  if (root === null) {
    return;
  }

  // *** 前序位置 ***
  // 每一个节点需要做的事就是交换它的左右子节点
  let left = root.left;
  let right = root.right;
  root.left = right;
  root.right = left;

  // 遍历框架，去遍历左右子树的节点
  traverse(root.left);
  traverse(root.right);

  // *** 也可以放在后序位置 ***
  // let tmp = root.left;
  // root.left = root.right;
  // root.right = tmp;
}


/* BFS*/
// 2. Queue BFS Solution
let invertTree2 = function (root) {
  if (!root) {
    return null;
  }

  let queue = [root];

  while (queue.length) {
    let node = queue.shift();
    let left = node.left;
    let right = node.right;
    node.left = right, node.right = left;

    if (node.left != null) {
      queue.push(node.left);
    }
    if (node.right != null) {
      queue.push(node.right);
    }
  }
  return root;
};
// @lc code=end
