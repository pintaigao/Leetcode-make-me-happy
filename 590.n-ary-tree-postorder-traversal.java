import java.util.List;

/*
 * @lc app=leetcode id=590 lang=java
 *
 * [590] N-ary Tree Postorder Traversal
 */
/*
// Definition for a Node.
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val,List<Node> _children) {
        val = _val;
        children = _children;
    }
};
*/
class Solution {
    public List<Integer> postorder(Node root) {
        List<Integer> list = new ArrayList<>();
        if (root == null) {
            return list;
        }
        traveler(root.children, list);
        list.add(root.val);
        return list;
    }

    void traveler(List<Node> root, List<Integer> list) {
        if (root.size() == 0)
            return;
        for (int i = 0; i < root.size(); i++) {
            Node node = root.get(i);
            traveler(node.children, list);
            list.add(node.val);
        }
    }
}
