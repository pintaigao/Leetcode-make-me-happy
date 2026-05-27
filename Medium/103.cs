/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
  public IList<IList<int>> ZigzagLevelOrder(TreeNode root) {
    // List<IList<int>> 和 List<List<int>> 有什么区别？
    // 1. List<IList<int>> 是一个接口类型，表示一个列表，其中的元素是 IList<int> 类型的对象。IList<int> 是一个接口，表示一个整数列表，可以是 List<int>、ArrayList<int> 等等。
    // 2. List<List<int>> 是一个具体的类型，表示一个列表，其中的元素是 List<int> 类型的对象。List<int> 是一个具体的类型，表示一个整数列表。
    // 在实际使用中，List<IList<int>> 更加灵活，因为它允许我们使用任何实现了 IList<int> 接口的类型，而 List<List<int>> 则限制了我们只能使用 List<int> 类型的对象。
    var result = new List<List<int>>();

    void traverse(TreeNode root, int level, List<List<int>> result) {
      if (root == null) {
        return;
      }
      // 不可以用 result[level] == null 来判断是否需要添加新的一层，因为 result[level] 可能存在但值为 null，
      // 所以在这里 result.Count == level 能达到同样的效果。
      if (result.Count == level) {
        result.Add(new List<int>());
      }

      if (level % 2 == 0) {
        result[level].Add(root.val);
      }
      else {
        result[level].Insert(0, root.val);
      }

      traverse(root.left, level + 1, result);
      traverse(root.right, level + 1, result);
    }
    traverse(root, 0, result);
    return result;
  }
}