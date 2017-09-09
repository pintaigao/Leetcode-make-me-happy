/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
   public class Solution {
    public ListNode deleteDuplicates(ListNode head) {
       if(head == null)
           return null;
       if(head.next!= null && head.next.val == head.val) {
            head.next= head.next.next;
            head = deleteDuplicates(head);
        }
       else
            head.next= deleteDuplicates(head.next);             return head;
    } 
}
}