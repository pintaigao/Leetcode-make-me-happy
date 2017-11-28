/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode oddEvenList(ListNode head) {
        if(head != null){
            if(head.next == null || head.next.next == null){
                return head;
            }
            else {
                ListNode odd = head;
                ListNode even = head.next;
                ListNode even1 = head.next;
                while (even != null && even.next != null) {
                    odd.next = even.next;
                    odd = odd.next;
                    even.next = odd.next;
                    even = even.next;
                }
                odd.next = even1 ;
            }
        }
        return head;
    }
}