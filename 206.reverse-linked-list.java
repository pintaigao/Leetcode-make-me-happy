/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode reverseList(ListNode head) {
        if (head == null)
            return head;
        Stack<ListNode> stack = new Stack<ListNode>();
        while (head != null) {
            stack.push(head);
            head = head.next;
        }

        ListNode temp = stack.pop();//启动因子
        ListNode head2 = temp;
        ListNode oldtemp = new ListNode(0);
        while (!stack.isEmpty()) //添加到队尾
        {
            oldtemp = temp;
            temp = new ListNode(0);
            temp = stack.pop();
            temp.next = null;
            oldtemp.next = temp;
        }
        return head2;
    }

}