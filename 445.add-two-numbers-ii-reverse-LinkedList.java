/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        reverseList(l1);
        reverseList(l2);
        ListNode result = new ListNode(0);
        ListNode head = result;
        int count = 0;
        while (l1 != null || l2 != null) {
            ListNode val = new ListNode((l1 == null ? 0 : l1.val) + (l2 == null ? 0 : l2.val) + count);
            result.next = val;
            result = result.next;
            count = 0;
            if (result.val >= 10) {
                count += result.val / 10;
                result.val %= 10;
            }
            l1 = (l1.next == null) ? null : l1.next;
            l2 = (l2.next == null) ? null : l2.next;
        }
        if (count != 0) {
            result.next = new ListNode(count);
            result = result.next;
        }
        reverseList(head.next);
        return result;
    }

    public void reverseList(ListNode node) {
        ListNode before = null;
        ListNode tmp = node;
        ListNode next = tmp.next;
        while (tmp != null) {
            if (next == null)
                return;
            tmp.next = before;
            before = tmp;
            tmp = next;
            next = next.next;
        }
    }

}