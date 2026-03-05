// 动态规划思路
// 定义：输入一个节点，返回以该节点为根的二叉树的中序遍历结果
var inorderTraversal = function (root) {
  let res = [];
  if (root === null) {
    return res;
  }
  res = res.concat(inorderTraversal(root.left));
  res.push(root.val);
  res = res.concat(inorderTraversal(root.right));
  return res;
};

// 回溯算法思路
// 返回前序遍历结果
var inorderTraversal2 = function (root) {
  let res = [];
  traverse(root, res);
  return res;
};

// 二叉树遍历函数
var traverse = function (root, res) {
  if (root === null) {
    return;
  }
  traverse(root.left, res);
  // 中序遍历位置
  res.push(root.val);
  traverse(root.right, res);
};