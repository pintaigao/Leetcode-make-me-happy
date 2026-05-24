// 解法一、分解问题的思路
// 定义：输入一个根节点，返回该根节点到叶子节点是否存在一条和为 targetSum 的路径
var hasPathSum = function (root, targetSum) {
  // base case
  if (root === null) {
    return false;
  }
  // root.left == root.right 等同于 root.left == null && root.right == null
  if (root.left === null && root.right === null && root.val === targetSum) {
    return true;
  }

  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
};

// 解法二、遍历二叉树的思路
var hasPathSum_2 = function (root, targetSum) {
  let target = targetSum;
  let found = false;
  // 记录遍历过程中的路径和
  let curSum = 0;

  // 二叉树遍历函数
  function traverse(root) {
    if (root === null) {
      return;
    }
    // 前序遍历位置
    curSum += root.val;
    if (root.left === null && root.right === null) {
      if (curSum === target) {
        found = true;
      }
    }

    traverse(root.left);
    traverse(root.right);

    // 后序遍历位置
    curSum -= root.val;
  }

  traverse(root);
  return found;
};

var hasPathSum_3 = function (root, targetSum) {
  // 记录遍历过程中的路径和
  let target = targetSum, found = false, curSum = 0;

  // 二叉树遍历函数
  function traverse(root, sum) {
    if (root === null) {
      return;
    }

    // root.left == null && root.right == null 说明 root 是叶子节点
    if (root.left === null && root.right === null && sum + root.val === target) {
      found = true;
    }

    // 不能是 root.left.val 或 root.right.val，因为 root.left 或 root.right 可能为 null
    traverse(root.left, sum + root.val);
    traverse(root.right, sum + root.val);
  }

  traverse(root, 0);
  return found;
};