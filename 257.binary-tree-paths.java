
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
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> answer = new ArrayList<>();
        if(root != null ) helper(root,answer,"");
        return answer;
    }

    public void helper(TreeNode root,List<String> answer,String string){
        if(root.left == null && root.right == null ) answer.add(string+root.val);
        if(root.left != null) helper(root.left, answer, string+root.val+"->");
        if(root.right != null) helper(root.right,answer,string+root.val+"->");

    }
}