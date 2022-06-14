/*
 * @lc app=leetcode id=250 lang=javascript
 *
 * [250] Count Univalue Subtrees
 */

// @lc code=start
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
 * @return {number}
 */
/* DFS 从下往上看 */
var countUnivalSubtrees = function (root) {
  let count = 0;
  let is_uni = function (node) {
    // 叶子算相同子树
    if (node.left == null && node.right == null) {
      count += 1;
      return true;
    }

    let is_unival = true;

    // 如果这个node的左边有，
    if (node.left != null) {
      is_unival = is_uni(node.left) && is_unival && node.left.val == node.val;
    }

    if (node.right != null) {
      is_unival = is_uni(node.right) && is_unival && node.right.val == node.val;
    }

    if (!is_unival) return false;
    count += 1;
    return true;
  };

  if (root == null) return 0;
  is_uni(root);
  return count;
};

// Approach 2: Depth First Search: Pass Parent Values
var countUnivalSubtrees2 = function (root, count = 0) {
  if (!root) {
    return count;
  }
  if (isSame(root)) count += 1;
  count = countUnivalSubtrees(root.left, count);
  count = countUnivalSubtrees(root.right, count);
  return count;
};

let isSame = function (root) {
  if (!root) return true;
  if (root.left && root.left.value !== root.val) return false;
  if (root.right && root.right.value !== root.val) return false;
  return isSame(root.left) && isSame(root.right);
};

// Approach 3: Depth First Search
var countUnivalSubtrees3 = function (root) {
  let result = 0;
  function helper(root) {
    if (!root) return true;

    let left = helper(root.left);
    let right = helper(root.right);

    if (left && right) {
      if ((root.left && root.val !== root.left.val) || (root.right && root.val !== root.right.val)) {
        return false;
      }
      result += 1;
      return true;
    }
    return false;
  }

  helper(root);
  return result;
};

// Approach 4: DFS
let countUnivalSubtrees4 = function (root) {
  let count = 0;
  let is_valid_part = function (node, val) {
    // considered a valid subtree
    if (node == null) return true;

    // check if node.left and node.right are univalue subtrees of value node.val
    // note that || short circuits but | does not - both sides of the or get evaluated with | so we explore all possible routes
    if (!is_valid_part(node.left, node.val) || !is_valid_part(node.right, node.val)) return false;

    // if it passed the last step then this a valid subtree - increment
    count += 1;

    // at this point we know that this node is a univalue subtree of value node.val
    // pass a boolean indicating if this is a valid subtree for the parent node
    return node.val == val;
  };
  is_valid_part(root, 0);
  return count;
};
// @lc code=end
