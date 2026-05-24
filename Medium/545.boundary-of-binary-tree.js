// 1. Simple Solution
let boundaryOfBinaryTree = function (root) {
  // Check Left, Leaves, Right
  let left = [], leaves = [], right = [], res = [];
  let isLeaf = function (node) {
    return node.left == null && node.right == null;
  }
  let checkLeft = function (node) {
    if (node == null || isLeaf(node)) return;

    left.push(node.val);
    if (node.left != null) {
      checkLeft(node.left);
    } else {
      checkLeft(node.right);
    }
  }
  let checkLeaves = function (node) {
    if (isLeaf(node)) {
      leaves.push(node.val);
    } else {
      if (node.left != null) {
        checkLeaves(node.left);
      }
      if (node.right != null) {
        checkLeaves(node.right);
      }
    }
  }

  let checkRight = function (node) {
    if (node == null || isLeaf(node)) return;

    right.push(node.val);
    if (node.right != null) {
      checkRight(node.right);
    } else {
      checkRight(node.left);
    }
  }

  checkLeft(root.left);
  checkLeaves(root);
  checkRight(root.right);

  if (!isLeaf(root)) {
    res.push(root.val);
  }

  return [...res, ...left, ...leaves, ...right.reverse()];
}
// Solution 2: 严格执行先序遍历的方法
// 2. Preorder Traversal
let boundaryOfBinaryTree2 = function (root) {
  let [left_boundary, right_boundary, leaves] = [[], [], []];

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

  preorder(root, left_boundary, right_boundary, leaves, 0);
  return [...left_boundary, ...leaves, ...right_boundary];
};



// 练习
let boundaryOfBinaryTree10 = function (root) {
  // Check Left, Leaves, Right
  let left = [], leaves = [], right = [], res = [];
  let isLeaf = function (node) {
    return node.left == null && node.right == null;
  }
  let checkLeft = function (node) {
    if (node == null || isLeaf(node)) return;

    left.push(node.val);
    if (node.left != null) {
      checkLeft(node.left);
    } else {
      checkLeft(node.right);
    }
  }

  let checkLeaves = function (node) {
    if (isLeaf(node)) {
      leaves.push(node.val);
    } else {
      if (node.left != null) {
        checkLeaves(node.left);
      }
      if (node.right != null) {
        checkLeaves(node.right);
      }
    }
  }

  let checkRight = function (node) {
    if (node == null || isLeaf(node)) return;

    right.push(node.val);
    if (node.right != null) {
      checkRight(node.right);
    } else {
      checkRight(node.left);
    }
  }

  checkLeft(root.left);
  checkLeaves(root);
  checkRight(root.right);

  if (!isLeaf(root)) {
    res.push(root.val);
  }

  return [...res, ...left, ...leaves, ...right.reverse()];
}
