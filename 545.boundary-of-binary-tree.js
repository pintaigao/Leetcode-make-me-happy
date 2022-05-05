// 1. Simple Solution
var boundaryOfBinaryTree = function (root) {
  let isLeaf = function (t) {
    return t.left == null && t.right == null;
  };

  let addLeavesToResult = function (res, root) {
    if (isLeaf(root)) {
      res.push(root.val);
    } else {
      if (root.left != null) {
        addLeavesToResult(res, root.left);
      }
      if (root.right != null) {
        addLeavesToResult(res, root.right);
      }
    }
  };

  let res = [];
  if (root == null) {
    return res;
  }

  // 检测左边界
  if (!isLeaf(root)) {
    res.push(root.val);
  }
  let t = root.left;
  while (t != null) {
    if (!isLeaf(t)) {
      res.push(t.val);
    }
    if (t.left != null) {
      t = t.left;
    } else {
      t = t.right;
    }
  }

  // 检测叶子节点
  addLeavesToResult(res, root);

  // 检测右边的边界
  let s = [];
  t = root.right;
  while (t != null) {
    if (!isLeaf(t)) {
      s.push(t.val);
    }
    if (t.right != null) {
      t = t.right;
    } else {
      t = t.left;
    }
  }

  res = [...res, ...s.reverse()];

  return res;
};

// Solution 2: 严格执行先序遍历的方法
// 2. Preorder Traversal
let boundaryOfBinaryTree2 = function (root) {
  let [left_boundary, right_boundary, leaves] = [[], [], []];
  preorder(root, left_boundary, right_boundary, leaves, 0);
  return [...left_boundary, ...leaves, ...right_boundary];
};

let isLeaf = function (cur) {
  return cur.left == null && cur.right == null;
};

let isRightBoundary = function (flag) {
  return flag == 2;
};

let isLeftBoundary = function (flag) {
  return flag == 1;
};

let isRoot = function (flag) {
  return flag == 0;
};

let leftChildFlag = function (cur, flag) {
  if (isLeftBoundary(flag) || isRoot(flag)) return 1;
  else if (isRightBoundary(flag) && cur.right == null) return 2;
  else return 3;
};

let rightChildFlag = function (cur, flag) {
  if (isRightBoundary(flag) || isRoot(flag)) return 2;
  else if (isLeftBoundary(flag) && cur.left == null) return 1;
  else return 3;
};

let preorder = function (cur, left_boundary, right_boundary, leaves, flag) {
  if (cur == null) return;
  if (isRightBoundary(flag)) right_boundary.push(0, cur.val);
  else if (isLeftBoundary(flag) || isRoot(flag)) left_boundary.push(cur.val);
  else if (isLeaf(cur)) leaves.push(cur.val);
  preorder(cur.left, left_boundary, right_boundary, leaves, leftChildFlag(cur, flag));
  preorder(cur.right, left_boundary, right_boundary, leaves, rightChildFlag(cur, flag));
};
