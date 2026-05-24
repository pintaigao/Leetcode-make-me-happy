// 动态规划思路
// 定义：输入一个节点，返回以该节点为根的二叉树的前序遍历结果
var preorderTraversal = function (root) {
  let res = [];
  if (root === null) {
    return res;
  }
  // 前序遍历结果特点：第一个是根节点的值，接着是左子树，最后是右子树
  res.push(root.val);
  res = [...res, ...preorderTraversal(root.left)];
  res = [...res, ...preorderTraversal(root.right)];
  return res;
};

// 回溯算法思路
var preorderTraversal2 = function (root) {
  let res = [];
  // 返回前序遍历结果
  // 二叉树遍历函数
  var traverse = function (root) {
    if (root === null) {
      return;
    }
    // 前序遍历位置
    res.push(root.val);
    traverse(root.left);
    traverse(root.right);
  };
  traverse(root);
  return res;
};