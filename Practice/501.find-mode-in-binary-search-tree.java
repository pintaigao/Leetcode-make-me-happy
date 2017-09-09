import java.util.ArrayList;
import java.util.List;

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
    public Integer num = null;
    public int count = 1;
    public int max = 0;
    public int[] findMode(TreeNode root) {
        List<Integer> list = new ArrayList<>();
        helper(root,list);
        int[] result = new int[list.size()];
        for(int i = 0;i < list.size();i++){
            result[i] = list.get(i);
        }
        return result;
    }

    public void helper(TreeNode root,List<Integer> list){
        if(root == null){
            return;
        }
        helper(root.left, list);
        //只是针对这个节点而言
        if(num != null){
            if(root.val == num){
                count ++;
            }else{
                count = 1;
            }
        }
        if(count > max){
            max = count;
            list.clear();
            list.add(root.val);
        }else if(count == max){
            list.add(root.val);
        }
        num = root.val;
        helper(root.right, list);

    }
}