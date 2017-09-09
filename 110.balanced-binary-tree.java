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
	public boolean isBalanced(TreeNode root) {
		if (root == null) return true;
		return isBalancedHelper(root) != -1;        
	}

	public int isBalancedHelper(TreeNode node){
		if(node == null) return 0;
		int leftHeight = isBalancedHelper(node.left);
		if(leftHeight == -1) return -1;
		int rightHeight = isBalancedHelper(node.right);
		if(rightHeight == -1 ) return -1;
		if (leftHeight - rightHeight > 1 || leftHeight - rightHeight < -1){
			return -1;
		}
		return 1+Math.max(leftHeight,rightHeight); 
	}
}
