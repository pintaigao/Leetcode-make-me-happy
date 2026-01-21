import java.util.ArrayList;
import java.util.List;

/*
 * @lc app=leetcode id=199 lang=java
 *
 * [199] Binary Tree Right Side View
 */
/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
// class Solution {
// public List<Integer> rightView(TreeNode root) {
// List<Integer> result = new ArrayList<>();

// if (root == null)
// return result;

// Queue<TreeNode> q = new LinkedList<>();

// q.offer(root);

// while (!q.isEmpty()) {
// int qSize = q.size();
// if (qSize > 0) {
// result.add(q.peek().val);
// }
// while (qSize-- > 0) {
// TreeNode f = q.poll();
// if (f.right != null) {
// q.offer(f.right);
// }
// if (f.left != null)
// q.offer(f.left);
// }
// }

// return result;
// }
// }

class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        dfs(root, result, 0);
        return result;
    }

    void dfs(TreeNode root, List<Integer> list, int level) {
        if (root == null) {
            return;
        }
        if (list.size() <= level) {
            list.add(root.val);
        }
        dfs(root.right, list, level + 1);
        dfs(root.left, list, level + 1);
    }
}
