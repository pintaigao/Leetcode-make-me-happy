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
// var pathSum = function (root, sum) {

//   let result = 0;
//   if (!root) {
//     return result;
//   }

//   var helper = function (root, sum) {
//     if (!root) {
//       return;
//     }

//     if (sum === 0) {
//       result++;
//     }

//     pathSum(root.left, sum - node.val);
//     pathSum(root.right, sum - node.val);
//   }

//   helper(root, sum);
// };

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
  }
  const tree = node => {
    if (node) {
      check(node, sum);
      tree(node.left);
      tree(node.right);
    }
  }
  tree(root);
  return count;
};

var pathSum = function (root, sum) {
  let map = new Map()
  map.set(0, 1)
  let total = 0
  let result = 0;
  helper(root)
  function helper(root) {
    if (!root) return
    total += root.val
    let key = total - sum
    if (map.has(key)) {


      result += map.get(key)
    }

    map.set(total, map.get(total) + 1 || 1)
    helper(root.left)
    helper(root.right)
    map.set(total, map.get(total) - 1 || 0)
    total -= root.val
  }
  return result

}

var pathSum = function (root, sum) {
  if (!root) return 0;
  return pathSum(root.left, sum) + pathSum(root.right, sum) + pathSumFrom(root, sum);
}
var pathSumFrom = function (node, sum) {
  if (!node) return 0;
  return (sum === node.val ? 1 : 0) + pathSumFrom(node.left, sum - node.val) + pathSumFrom(node.right, sum - node.val);
}
