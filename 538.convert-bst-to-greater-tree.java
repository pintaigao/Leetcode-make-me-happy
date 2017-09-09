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
    int sum;
    public TreeNode convertBST(TreeNode root) {
        
        if(root == null){
            return root;
        }
        convertBST(root.right);
        int prev = root.val;
        root.val = sum + root.val;
        sum = sum + prev;
        convertBST(root.left);
        return root;            
    }
}