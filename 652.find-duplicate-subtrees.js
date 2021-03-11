/*
 * @lc app=leetcode id=652 lang=javascript
 *
 * [652] Find Duplicate Subtrees
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
 * @return {TreeNode[]}
 */

// 1. Postorder Traversal Solution O(n^2) 的方法
var findDuplicateSubtrees = function (root) {
  let res = [];
  let map = {};

  let postorder = function (cur) {
    if (cur == null) return "#";
    let serial =
      cur.val + "," + postorder(cur.left) + "," + postorder(cur.right);

    if (!map.hasOwnProperty(serial)) {
      map[serial] = 1;
    } else {
      map[serial] += 1;
    }

    if (map[serial] == 2) res.push(cur);
    return serial;
  };

  postorder(root);
  return res;
};

// 2.Postorder O(n) 的方法
let findDuplicateSubtrees2 = function (root) {
  let curId = 1;

  let serialToId = {};
  let idToCount = {};
  let res = [];

  let postorder = function (root) {
    if (root == null) return 0;
    let leftId = postorder(root.left);
    let rightId = postorder(root.right);
    let curSerial = leftId + "," + root.val + "," + rightId;

    let serialId;

    if (!serialToId.hasOwnProperty(curSerial)) {
      serialId = curId;
    } else {
      serialId = serialToId[curSerial];
    }

    if (serialId == curId) curId += 1;

    serialToId[curSerial] = serialId;

    if (!idToCount.hasOwnProperty(serialId)) {
      idToCount[serialId] = 1;
    } else {
      idToCount[serialId] += 1;
    }

    if (idToCount[serialId] == 2) res.push(root);
    return serialId;
  };

  postorder(root);
  return res;
};
// @lc code=end
