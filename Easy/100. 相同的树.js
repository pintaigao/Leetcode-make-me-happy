var isSameTree = function (p, q) {
  // 定义：输入两个根节点，返回以它们为根的两棵二叉树是否相同
  // 判断一对节点是否相同
  if (p == null && q == null) {
    return true;
  }
  if (p == null || q == null) {
    return false;
  }
  if (p.val != q.val) {
    return false;
  }

  // 判断其他节点是否相同
  let leftTree = isSameTree(p.left, q.left), rightTree = isSameTree(p.right, q.right);
  // 判断左子树和右子树是否相同
  if (!leftTree || !rightTree) {
    return false;
  }
  return true;
};