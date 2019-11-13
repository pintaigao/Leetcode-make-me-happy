/*
 * @lc app=leetcode id=199 lang=javascript
 *
 * [199] Binary Tree Right Side View
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
    let result = [];

    if (!root) {
        return result
    }

    function dfs(root) {
        if (!root) {
            return;
        }

        result.push(root.val);
        dfs(root.right);
        dfs(root.left);
    }
    result.push(root.val);
    if (root.right) {
        dfs(root.right);
    } else {
        dfs(root.left);
    }

    return result;
};


// @lc code=end

