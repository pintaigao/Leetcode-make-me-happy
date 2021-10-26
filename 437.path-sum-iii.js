/*
 * @lc app=leetcode id=437 lang=javascript
 *
 * [437] Path Sum III
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
var pathSum = function (root, sum) {
  let count = 0;
  const check = (node, sum) => {
    if (node) {
      if (node.val === sum) {
        count++;
      }
      check(node.left, sum - node.val);
      check(node.right, sum - node.val);
    }
  };
  const tree = (node) => {
    if (node) {
      check(node, sum);
      tree(node.left);
      tree(node.right);
    }
  };
  tree(root);
  return count;
};

var pathSum2 = function (root, sum) {
  let map = new Map();
  map.set(0, 1);
  let total = 0;
  let result = 0;
  helper(root);
  function helper(root) {
    if (!root) return;
    total += root.val;
    let key = total - sum;
    if (map.has(key)) {
      result += map.get(key);
    }

    map.set(total, map.get(total) + 1 || 1);
    helper(root.left);
    helper(root.right);
    map.set(total, map.get(total) - 1 || 0);
    total -= root.val;
  }
  return result;
};

var pathSum3 = function (root, sum) {
  if (!root) return 0;
  return (
    pathSum(root.left, sum) + pathSum(root.right, sum) + pathSumFrom(root, sum)
  );
};
var pathSumFrom = function (node, sum) {
  if (!node) return 0;
  return (
    (sum === node.val ? 1 : 0) +
    pathSumFrom(node.left, sum - node.val) +
    pathSumFrom(node.right, sum - node.val)
  );
};

// Approach 1: Prefix Sum
let pathSum4 = function (root, sum) {
  let count = 0;
  let h = {};
  let preorder = function (node, currSum) {
    if (node == null) return;

    // current prefix sum
    currSum += node.val;

    // here is the sum we're looking for
    if (currSum === sum) count++;

    // number of times the curr_sum − k has occured already,
    // determines the number of times a path with sum k
    // has occured upto the current node
    if (h.hasOwnProperty(currSum - sum)) {
      count += h[currSum - sum];
      console.log(count);
    }

    // add the current sum into hashmap
    // to use it during the child nodes processing
    if (h.hasOwnProperty(currSum)) {
      h[currSum] = h[currSum] + 1;
    } else {
      h[currSum] = 1;
    }

    // process left subtree
    preorder(node.left, currSum);
    // process right subtree
    preorder(node.right, currSum);

    // remove the current sum from the hashmap
    // in order not to use it during
    // the parallel subtree processing
    h[currSum] = h[currSum] - 1;
  };

  preorder(root, 0);
  return count;
};
