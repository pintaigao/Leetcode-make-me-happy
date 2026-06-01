using System;
using System.Collections.Generic;

// Definition for a binary tree node.
// public class TreeNode {
//   public int val;
//   public TreeNode left;
//   public TreeNode right;
//   public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
//     this.val = val;
//     this.left = left;
//     this.right = right;
//   }
// }

public class Solution {
  public IList<IList<int>> PathSum(TreeNode root, int targetSum) {
    IList<IList<int>> result = new List<IList<int>>();
    List<int> path = new List<int>();

    void Dfs(TreeNode root, int targetSum) {
      if (root == null) {
        return;
      }

      path.Add(root.val);
      targetSum -= root.val;

      if (root.left == null && root.right == null && targetSum == 0) {
        result.Add(new List<int>(path));
      }

      Dfs(root.left, targetSum);
      Dfs(root.right, targetSum);

      path.RemoveAt(path.Count - 1);
    }

    Dfs(root, targetSum);
    return result;
  }
}