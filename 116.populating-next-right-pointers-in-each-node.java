/**
 * Definition for binary tree with next pointer.
 * public class TreeLinkNode {
 *     int val;
 *     TreeLinkNode left, right, next;
 *     TreeLinkNode(int x) { val = x; }
 * }
 */
public class Solution {
    public void connect(TreeLinkNode root) {
        TreeLinkNode newlink = root;
        while (newlink != null) {
            TreeLinkNode path = newlink;
            while (path != null) {
                if (path.left != null)
                    path.left.next = path.right;
                if (path.right != null && path.next != null)
                    path.right.next = path.next.left;
                path = path.next;
            }
            newlink = newlink.left;
        }
    }
}