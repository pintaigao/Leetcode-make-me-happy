import java.util.Comparator;
import java.util.PriorityQueue;

/*
 * @lc app=leetcode id=272 lang=java
 *
 * [272] Closest Binary Search Tree Value II
 */

// @lc code=start
/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
// class Solution {
// public List<Integer> closestKValues(TreeNode root, double target, int k) {
// PriorityQueue<Integer> queue = new PriorityQueue<>(2,new
// Comparator<Integer>() {
// @Override
// public int compare(Integer num1, Integer num2) {
// if (Math.abs(num1 - target) < Math.abs(num2 - target)) {
// return num1 - num2;
// }
// }
// });

// while(root != null) {
// queue.add(root.val);
// if(target < root.val) root = root.left;
// if(target > root.val) root = root.left;
// if (target == root.val) {
// }
// }
// }
// }

public class Solution {
    public List<Integer> closestKValues(TreeNode root, double target, int k) {
        LinkedList<Integer> list = new LinkedList<Integer>();
        closestKValuesHelper(list, root, target, k);
        return list;
    }

    /**
     * @return <code>true</code> if result is already found.
     */
    private boolean closestKValuesHelper(LinkedList<Integer> list, TreeNode root, double target, int k) {
        if (root == null) {
            return false;
        }

        if (closestKValuesHelper(list, root.left, target, k)) {
            return true;
        }

        if (list.size() == k) {
            if (Math.abs(list.getFirst() - target) < Math.abs(root.val - target)) {
                return true;
            } else {
                list.removeFirst();
            }
        }

        list.addLast(root.val);
        return closestKValuesHelper(list, root.right, target, k);
    }
}
// @lc code=end
