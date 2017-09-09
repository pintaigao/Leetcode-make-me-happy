
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
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<Integer>();
        if (root == null){
            return res;
        }
        dfs (root, res, 0);
        return res;
    }
    
    public void dfs (TreeNode root, List<Integer> res, int level){
        if (root == null){
            return;
        }
        if (res.size() == level){
            res.add (root.val);
        }
        if (root.right != null){
            dfs (root.right, res, level + 1);
        }
        if (root.left != null){
            dfs (root.left, res, level + 1);
        }
    }
}