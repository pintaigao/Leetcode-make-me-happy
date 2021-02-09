/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

// 1. Simple Solution
var boundaryOfBinaryTree = function (root) {
  let isLeaf = function (t) {
    return t.left == null && t.right == null;
  };

  let addLeaves = function (res, root) {
    if (isLeaf(root)) {
      res.push(root.val);
    } else {
      if (root.left != null) {
        addLeaves(res, root.left);
      }
      if (root.right != null) {
        addLeaves(res, root.right);
      }
    }
  };

  let res = [];
  if (root == null) {
    return res;
  }
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
  addLeaves(res, root);
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
  while (s.length !== 0) {
    res.push(s.shift());
  }
  return res;
};

// 2. Preorder Traversal
let boundaryOfBinaryTree2 = function (root) {
  let left_boundary = [],
    right_boundary = [],
    leaves = [];
  preorder(root, left_boundary, right_boundary, leaves, 0);
  left_boundary = [...left_boundary, ...leaves];
  left_boundary = [...left_boundary, ...right_boundary];
  return left_boundary;
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
  preorder(
    cur.left,
    left_boundary,
    right_boundary,
    leaves,
    leftChildFlag(cur, flag)
  );
  preorder(
    cur.right,
    left_boundary,
    right_boundary,
    leaves,
    rightChildFlag(cur, flag)
  );
};
