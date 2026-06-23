var maxPathSum = function (root) {
  let res = Number.MIN_SAFE_INTEGER;

  // 定义：计算从根节点 root 为起点的最大单边路径和
  function oneSideMax(root) {
    if (root === null) {
      return 0;
    }
    let leftMaxSum = Math.max(0, oneSideMax(root.left));
    let rightMaxSum = Math.max(0, oneSideMax(root.right));
    // 后序遍历位置，顺便更新最大路径和
    let pathMaxSum = root.val + leftMaxSum + rightMaxSum;
    res = Math.max(res, pathMaxSum);
    // 实现函数定义，左右子树的最大单边路径和加上根节点的值
    // 就是从根节点 root 为起点的最大单边路径和
    return Math.max(leftMaxSum, rightMaxSum) + root.val;
  }

  // 计算单边路径和时顺便计算最大路径和
  if (root === null) {
    return 0;
  }
  oneSideMax(root);
  return res;
};

// 练习
var maxPathSum10 = function (root) {
  let res = Number.MIN_SAFE_INTEGER;

  // 定义：计算从根节点 root 为起点的最大单边路径和
  function oneSideMax(root) {
    if (root === null) {
      return 0;
    }
    let leftMaxSum = oneSideMax(root.left), rightMaxSum = oneSideMax(root.right); // 后续遍历
    // 然后做的过程中就会发现root.val + leftMaxSum + rightMaxSum， 如果leftMax 或者 rightMax 是负数的话，反而会降低路径和，所以我们在计算 leftMaxSum 和 rightMaxSum 的时候就把负数的情况排除掉了
    // 就不走负数的路径了
    if (leftMaxSum < 0) { leftMaxSum = 0; }
    if (rightMaxSum < 0) { rightMaxSum = 0; }
    // 后序遍历位置，顺便更新最大路径和
    let pathMaxSum = root.val + leftMaxSum + rightMaxSum;

    res = Math.max(res, pathMaxSum);
    // 实现函数定义，左右子树的最大单边路径和加上根节点的值
    // 就是从根节点 root 为起点的最大单边路径和
    return Math.max(leftMaxSum, rightMaxSum) + root.val;
  }

  // 计算单边路径和时顺便计算最大路径和
  if (root === null) {
    return 0;
  }

  oneSideMax(root);
  return res;
};