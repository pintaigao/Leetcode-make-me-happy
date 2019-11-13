/*
 * @lc app=leetcode id=965 lang=java
 *
 * [965] Univalued Binary Tree
 */
/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
    public boolean isUnivalTree(TreeNode root) {
        if (root == null)
            return true;

        return isUnivalTree(root.left, root.val) && isUnivalTree(root.right, root.val);
    }

    private boolean isUnivalTree(TreeNode root, int key) {
        if (root == null)
            return true;

        if (root.val != key)
            return false;
        return isUnivalTree(root.left, key) && isUnivalTree(root.right, key);
    }
}
