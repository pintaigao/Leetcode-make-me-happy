/*
 * @lc app=leetcode id=105 lang=javascript
 *
 * [105] Construct Binary Tree from Preorder and Inorder Traversal
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
/* 一：递归传统的方法 */
var buildTree = function (preorder, inorder) {
  let buildTreeHelper = (preorder, p_start, p_end, inorder, i_start, i_end) => {
    // preorder 为空，直接返回 null
    if (p_start == p_end) {
      return null;
    }

    // preorder 从左至右，每一个node都是“左子树”的root
    let root_val = preorder[p_start];
    let root = new TreeNode(root_val);

    //在中序遍历中找到根节点的位置
    let i_root_index = 0;
    for (let i = i_start; i < i_end; i++) {
      if (root_val == inorder[i]) {
        i_root_index = i;
        break;
      }
    }
    // 左子树的node的个数
    let leftNum = i_root_index - i_start;
    //递归的构造左子树
    root.left = buildTreeHelper(preorder, p_start + 1, p_start + leftNum + 1, inorder, i_start, i_root_index);
    //递归的构造右子树
    root.right = buildTreeHelper(preorder, p_start + leftNum + 1, p_end, inorder, i_root_index + 1, i_end);
    return root;
  }

  // 两个order分别有一对指针，指向order的头和尾
  return buildTreeHelper(preorder, 0, preorder.length, inorder, 0, inorder.length);
};
// @lc code=end

