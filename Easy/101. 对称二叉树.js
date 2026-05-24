var isSymmetric = function (root) {
  if (root === null) return true;
  // 检查两棵子树是否对称
  return check(root.left, root.right);

  // 定义：判断输入的两棵树是否是镜像对称的
  function check(left, right) {
    if (left === null || right === null) {
      return left === right;
    }
    // 两个根节点需要相同
    if (left.val !== right.val) return false;

    let leftCheck = check(left.left, right.right);
    let rightCheck = check(left.right, right.left);
    // 左子树的左子树和右子树的右子树需要镜像对称
    // 左右子树也需要镜像对称
    return leftCheck && rightCheck;
  }
};