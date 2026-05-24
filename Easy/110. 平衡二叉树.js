var isBalanced = function (root) {
  // 记录二叉树是否平衡
  let isBalanced = true;

  // 输入一个节点，返回以该节点为根的二叉树的最大深度
  var maxDepth = function (root) {
    if (root === null) {
      return 0;
    }
    // if (!isBalanced) {
    // 随便返回一个值即可，旨在结束递归
    //     return -666;
    // }

    let leftMaxDepth = maxDepth(root.left);
    let rightMaxDepth = maxDepth(root.right);

    // 后序遍历位置
    // 如果左右最大深度大于 1，就不是平衡二叉树
    if (Math.abs(rightMaxDepth - leftMaxDepth) > 1) {
      isBalanced = false;
    }

    return 1 + Math.max(leftMaxDepth, rightMaxDepth);
  };

  maxDepth(root);
  return isBalanced;
};