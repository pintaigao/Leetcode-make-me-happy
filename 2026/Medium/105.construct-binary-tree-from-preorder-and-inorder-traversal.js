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

// 二：递归的简化版本
var buildTree = function (preorder, inorder) {
  if (!preorder.length || !inorder.length) return null
  const root = new TreeNode(preorder[0])
  const rootInInorderIndex = inorder.indexOf(preorder[0])
  const leftInorder = inorder.slice(0, rootInInorderIndex), leftPreorder = preorder.slice(1, leftInorder.length + 1)
  const rightInorder = inorder.slice(leftInorder.length + 1), rightPreorder = preorder.slice(leftInorder.length + 1)
  root.left = buildTree(leftPreorder, leftInorder), root.right = buildTree(rightPreorder, rightInorder)
  return root;
};
// @lc code=end

// 练习
var buildTree = function (preorder, inorder) {
  // 存储 inorder 中值到索引的映射
  var valToIndex = new Map();

  for (let i = 0; i < inorder.length; i++) {
    valToIndex.set(inorder[i], i);
  }
  return build(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1);

  // build 函数的定义：
  // 若前序遍历数组为 preorder[preStart..preEnd]，
  // 中序遍历数组为 inorder[inStart..inEnd]，
  // 构造二叉树，返回该二叉树的根节点
  function build(preorder, preStart, preEnd, inorder, inStart, inEnd) {

    if (preStart > preEnd) {
      return null;
    }

    // root 节点对应的值就是前序遍历数组的第一个元素
    var rootVal = preorder[preStart];
    // rootVal 在中序遍历数组中的索引
    var index = valToIndex.get(rootVal);

    var leftSize = index - inStart;

    // 先构造出当前根节点
    var root = new TreeNode(rootVal);
    // 递归构造左右子树
    root.left = build(preorder, preStart + 1, preStart + leftSize, inorder, inStart, index - 1);

    root.right = build(preorder, preStart + leftSize + 1, preEnd, inorder, index + 1, inEnd);
    return root;
  }
};
