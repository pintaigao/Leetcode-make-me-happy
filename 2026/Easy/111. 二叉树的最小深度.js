//「遍历」的递归思路 DFS
var minDepth = function (root) {
  let minDepth = Infinity, currentDepth = 1;

  var traverse = function (root, currentDepth) {
    if (root === null) {
      return;
    }

    // 如果当前节点是叶子节点，更新最小深度
    if (root.left === null && root.right === null) {
      minDepth = Math.min(minDepth, currentDepth);
    }

    traverse(root.left, currentDepth + 1);
    traverse(root.right, currentDepth + 1);
  }

  if (root === null) {
    return 0;
  }
  traverse(root, currentDepth);
  return minDepth;
};

// 「分解问题」的递归思路
var minDepth2 = function (root) {
  // 基本情况：如果节点为空，返回深度为0
  if (root === null) {
    return 0;
  }

  // 递归计算左子树的最小深度
  let leftDepth = minDepth2(root.left);
  // 递归计算右子树的最小深度
  let rightDepth = minDepth2(root.right);

  // 特殊情况处理：如果左子树为空，返回右子树的深度加1
  if (leftDepth === 0) {
    return rightDepth + 1;
  }
  // 特殊情况处理：如果右子树为空，返回左子树的深度加1
  if (rightDepth === 0) {
    return leftDepth + 1;
  }

  // 计算并返回最小深度：左右子树深度的最小值加1
  return Math.min(leftDepth, rightDepth) + 1;
};

// BFS 的思路
var minDepth3 = function (root) {
  if (root === null) return 0;
  // root 本身就是一层，depth 初始化为 1
  let q = [root], depth = 1;

  while (q.length > 0) {
    let size = q.length;
    // 遍历当前层的节点
    for (let i = 0; i < size; i++) {
      let cur = q.shift();
      // 判断是否到达叶子结点
      if (cur.left === null && cur.right === null)
        return depth;
      // 将下一层节点加入队列
      if (cur.left !== null)
        q.push(cur.left);
      if (cur.right !== null)
        q.push(cur.right);
    }
    // 这里增加步数
    depth++;
  }
  return depth;
};