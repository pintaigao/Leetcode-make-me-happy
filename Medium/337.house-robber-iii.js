/*
 * @lc app=leetcode id=337 lang=javascript
 *
 * [337] House Robber III
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
var rob = function (root) {
  // 后续遍历 post order traveler
  function traveler(root) {
    if (root == null) {
      return [0, 0];
    }

    let [rob1, noRob1] = traveler(root.left)
    let [rob2, noRob2] = traveler(root.right)

    // rob 代表我要抢这个屋子，则这个屋子的 left,right就不能抢，所以这个屋子 rob后最大金额 = rob.val + 上一个（left）选择不rob 时候被传递进来的最最大金额 + 上一个（right）选择不rob 时候被传递进来的最最大金额
    // 不 rob，那上一个 (left和 right)可以选择 rob 或者 不 rob，则选择上一个 (left和 right)时候rob 或者不 rob 计算好的最大金额
    let rob = noRob1 + noRob2 + root.val;
    let noRob = Math.max(rob1, noRob1) + Math.max(rob2, noRob2);

    return [rob, noRob]
  }

  let [rob, noRob] = traveler(root);

  return Math.max(rob, noRob);
}