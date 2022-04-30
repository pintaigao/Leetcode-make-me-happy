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
// 1. Postorder pattern化的方法 O(n^2) 的方法
var findDuplicateSubtrees = function (root) {
  let res = [];
  let map = {};

  let postorder = function (currrent_node) {
    if (currrent_node == null) return "#";
    let serial = currrent_node.val + "," + postorder(currrent_node.left) + "," + postorder(currrent_node.right);

    map[serial] = map[serial] ? map[serial] + 1 : 1;

    if (map[serial] == 2) res.push(currrent_node);
    return serial;
  };

  postorder(root);
  return res;
};

// 2.Postorder O(n) 的方法
let findDuplicateSubtrees2 = function (root) {
  let [curId, serialToId, idToCount, res] = [1, {}, {}, []];

  let postorder = function (root) {
    if (root == null) return 0;
    let [leftId, rightId] = [postorder(root.left), postorder(root.right)];
    let curSerial = leftId + "," + root.val + "," + rightId;

    // 为pattern assign一个id
    let serialId = serialToId[curSerial] || curId;

    // pattern 和 id 对应起来
    serialToId[curSerial] = serialId;

    // id 和 count 对应起来
    idToCount[serialId] = idToCount[serialId] ? idToCount[serialId] + 1 : 1;

    if (idToCount[serialId] == 2) res.push(root);

    // curId+1是为了下一个避免重复的serial
    curId += 1;

    return serialId;
  };

  postorder(root);
  return res;
};

// @lc code=end
