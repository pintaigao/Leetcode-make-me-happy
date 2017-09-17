

/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Solution {
    public int rob(TreeNode root) {
        int[] res = SubRob(root);
        return Math.max(res[0], res[1]);       
    }
    
    public int[] SubRob(TreeNode root){
        if(root == null) {
            return new int[2];
        }

        int[] left = SubRob(root.left);
        int[] right = SubRob(root.right);
        int[] res = new int[2];

        res[0] = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        res[1] = root.val + left[0] + right[0];

        return res;
    }
}