var sortedArrayToBST = function (nums) {
  // 将闭区间 [left, right] 中的元素转化成 BST，返回根节点
  function build(left, right) {
    if (left > right) {
      // 区间为空
      return null;
    }
    // 构造根节点
    // BST 节点左小右大，中间的元素就是根节点
    let mid = Math.floor((left + right) / 2);
    let root = new TreeNode(nums[mid]);
    // 递归构建左子树
    root.left = build(left, mid - 1);
    // 递归构造右子树
    root.right = build(mid + 1, right);

    return root;
  }

  return build(0, nums.length - 1);
};