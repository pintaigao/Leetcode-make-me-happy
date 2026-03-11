// 动态规划思路
// 定义：输入一个节点，返回以该节点为根的二叉树的后序遍历结果
var postorderTraversal = function (root) {
  let res = [];
  if (root === null) {
    return res;
  }
  // 后序遍历结果特点：先是左子树，接着是右子树，最后是根节点的值
  res = res.concat(postorderTraversal(root.left));
  res = res.concat(postorderTraversal(root.right));
  res.push(root.val);
  return res;
};

// 回溯算法思路
var postorderTraversal2 = function (root) {
  let res = [];
  // 返回后序遍历结果
  // 二叉树遍历函数
  var traverse = function (root) {
    if (root === null) {
      return;
    }
    traverse(root.left);
    traverse(root.right);
    // 后序遍历位置
    res.push(root.val);
  };
  traverse(root);
  return res;
};