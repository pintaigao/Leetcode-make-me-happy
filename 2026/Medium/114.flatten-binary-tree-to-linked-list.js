/*
 * @lc app=leetcode id=114 lang=javascript
 *
 * [114] Flatten Binary Tree to Linked List
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
 * @return {void} Do not return anything, modify root in-place instead.
 */

/* 解法一 */
var flatten = function (root) {
  while (root != null) {
    //左子树为 null，直接考虑下一个节点
    if (root.left == null) {
      root = root.right;
    } else {
      // 找左子树最右边的节点
      let pre = root.left;
      while (pre.right != null) {
        pre = pre.right;
      }
      //将原来的右子树接到左子树的最右边节点
      pre.right = root.right;
      // 将左子树插入到右子树的地方
      root.right = root.left;
      root.left = null;
      // 考虑下一个节点
      root = root.right;
    }
  }
};

/* 解法二: In place:通过后序遍历，每遍历一个节点就将当前节点的右指针更新为上一个节点*/
var flatten2 = function (root) {
  let [toVisit, cur, pre] = [[], root, null];

  while (cur != null || toVisit.length) {
    while (cur != null) {
      toVisit.unshift(cur); // 添加根节点
      cur = cur.right; // 递归添加右节点
    }
    cur = toVisit[0]; // 已经访问到最右的节点了
    // 在不存在左节点或者右节点已经访问过的情况下，访问根节点
    if (cur.left == null || cur.left == pre) {
      toVisit.shift();
      /**************修改的地方***************/
      cur.right = pre;
      cur.left = null;
      /*************************************/
      pre = cur;
      cur = null;
    } else {
      cur = cur.left; // 左节点还没有访问过就先访问左节点
    }
  }
}

// @lc code=end

