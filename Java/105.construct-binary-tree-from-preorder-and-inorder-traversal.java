

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
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        if(preorder.length <= 0 || inorder.length<=0)
            return null;
        TreeNode node = new TreeNode(preorder[0]);
        int index = getIndex(inorder,preorder[0]);
        if(preorder.length == 1){
            return node;
        }

        if(index > 0){
            int[] aa = copyOfRange(preorder,1,1+index);
            int[] bb = copyOfRange(inorder,0,index);
            node.left = buildTree(aa, bb);
        }
        if(index < inorder.length-1){
            int[] aa = copyOfRange(preorder, 1 + index, preorder.length);
            int[] bb = copyOfRange(inorder, index+1, inorder.length);
            node.right = buildTree(aa, bb);
        }
        return node;
    }

    public int getIndex(int[] target,int key){
        for(int i = 0 ; i< target.length;i++){
            if(target[i] == key ){
                return i;
            }
        }
        return -1;
    }

    public int[] copyOfRange(int[] target,int startIndex,int endIndex){
        int[] newOne = new int[endIndex-startIndex];
        int index = 0;
        while(startIndex < endIndex){
            newOne[index++] = target[startIndex++];
        }
        return newOne;
    }
}