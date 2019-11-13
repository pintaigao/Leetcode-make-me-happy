/*
 * @lc app=leetcode id=998 lang=java
 *
 * [998] Maximum Binary Tree II
 */
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    private final String LETTERS = "abcdefghijklmnopqrstuvwxyz";
    PriorityQueue<String> shortest = new PriorityQueue<>(1);
    public String smallestFromLeaf(TreeNode root) {
        dfs(root, new StringBuilder());
        return shortest.remove();
    }
    
    private void dfs(TreeNode node, StringBuilder path) {
        if(node == null) return;
        path.append(LETTERS.charAt(node.val));
        if(node.left == null && node.right == null) {
            shortest.add(path.reverse().toString());
            return;
        }
        dfs(node.left, new StringBuilder(path));
        dfs(node.right, new StringBuilder(path));
    }
}

