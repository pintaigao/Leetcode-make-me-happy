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
	public int sumOfLeftLeaves(TreeNode root) {
		if (root == null || root.left == null && root.right == null)
			return 0;

		int res = 0;
		Queue<TreeNode> queue = new LinkedList<>();
		queue.offer(root);

		while (!queue.isEmpty()) {
			TreeNode curr = queue.poll();

			if (curr.left != null && curr.left.left == null && curr.left.right == null)
				res += curr.left.val;
			if (curr.left != null)
				queue.offer(curr.left);
			if (curr.right != null)
				queue.offer(curr.right);
		}
		return res;
	}

}
