/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode list = new ListNode(0);
        ListNode head  = list;
        while(l1 != null || l2 !=null){
            if(l1 == null) {
                list.next = l2;
                return head.next;
            }else if(l2 == null){
                list.next = l1;
                return head.next;
            }else if(l1.val > l2.val){
                ListNode newlist = new ListNode(l2.val);
                list.next = newlist;
                list = newlist;
                l2 = l2.next;
            }else{
                ListNode newlist2 = new ListNode(l1.val);
                list.next = newlist2;
                list = newlist2;
                l1 = l1.next;
            }
            // list.next = null;
        }
        return head.next;
    }
}