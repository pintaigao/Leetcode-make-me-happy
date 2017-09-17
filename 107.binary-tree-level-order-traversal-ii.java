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
	public List<List<Integer>> levelOrderBottom(TreeNode root) {
		List<List<Integer>> result = new ArrayList<List<Integer>>();
		visit(root,result,0);
		Collections.reverse(result);
		return result;       
	}

	public void visit(TreeNode node, List<List<Integer>> list, int level){
		if (node  == null) return;
		if(list.size() < level + 1)  list.add(new ArrayList<Integer>()); //这个可以通过最顶层的root 想出来，list.size 现在为空，但是已经有一层了，所以要new
		list.get(level).add(node.val);
		visit(node.left,list,level+1);
		visit(node.right,list,level+1);
	}
}
