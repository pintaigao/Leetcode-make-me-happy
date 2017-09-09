/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode removeElements(ListNode head, int val) {
        if (head == null)
            return null;
        ListNode next = removeElements(head.next, val);//下一个节点也只有用递归表示了。
        if (head.val == val)
            return next; //这个节点的判断；
        else
            head.next = next;
        return head;
    }
}