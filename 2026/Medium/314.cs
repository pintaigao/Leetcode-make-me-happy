using System;
using System.Collections.Generic;
using System.Linq;

// Definition for a binary tree node.
// public class TreeNode {
//     public int val;
//     public TreeNode left;
//     public TreeNode right;
//     public TreeNode(int val = 0, TreeNode left = null, TreeNode right = null) {
//         this.val = val;
//         this.left = left;
//         this.right = right;
//     }
// }

public class Solution {
  public IList<IList<int>> VerticalOrder(TreeNode root) {
    IList<IList<int>> output = new List<IList<int>>();

    if (root == null) {
      return output;
    }

    Dictionary<int, List<int>> columnTable = new Dictionary<int, List<int>>();
    Queue<(TreeNode node, int column)> queue = new Queue<(TreeNode node, int column)>();

    queue.Enqueue((root, 0));

    while (queue.Count != 0) {
      var p = queue.Dequeue();
      TreeNode node = p.node;
      int column = p.column;

      if (!columnTable.ContainsKey(column)) {
        columnTable[column] = new List<int>();
      }

      columnTable[column].Add(node.val);

      if (node.left != null) {
        queue.Enqueue((node.left, column - 1));
      }

      if (node.right != null) {
        queue.Enqueue((node.right, column + 1));
      }
    }

    List<int> sortedKeys = columnTable.Keys.OrderBy(k => k).ToList();

    foreach (int k in sortedKeys) {
      output.Add(columnTable[k]);
    }

    return output;
  }
}