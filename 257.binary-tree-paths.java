/*
 * @lc app=leetcode id=257 lang=java
 *
 * [257] Binary Tree Paths
 */
/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> paths = new LinkedList<String>();
        return binaryTreePaths(root, paths, "");
    }

    public List<String> binaryTreePaths(TreeNode root, List<String> paths, String path) {
        if (root == null)
            return paths;
        path += root.val;
        if (root.left == null && root.right == null)
            paths.add(path);
        else
            path += "->";
        binaryTreePaths(root.left, paths, path);
        binaryTreePaths(root.right, paths, path);
        return paths;
    }
}
