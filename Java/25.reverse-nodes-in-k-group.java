/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
	public ListNode reverseKGroup(ListNode head, int k) {
		ListNode curr = head;
		int count = 0;
		while (curr != null && count != k) { // find the k+1 node
			curr = curr.next;
			count++;
		}
		if (count == k) { // if k+1 node is found
			curr = reverseKGroup(curr, k); // reverse list with k+1 node as head
			// head - head-pointer to direct part, 
			// curr - head-pointer to reversed part;
			while (count-- > 0) { // reverse current k-group: 
				ListNode tmp = head.next; // tmp - next head in direct part
				head.next = curr; // preappending "direct" head to the reversed list 
				curr = head; // move head of reversed part to a new node
				head = tmp; // move "direct" head to the next node in direct part
			}
			head = curr;
		}
		return head;
	}
   /*  public ListNode reverseKGroup(ListNode head, int k) {
		int count = 1;
		int turncount = 0;
		ListNode start, curr = head;
		ListNode next = head.next;
		while (next != null) {
			while (count != k) {
				curr = curr.next;
				if (curr == null)
					break;
				next = next.next;
				count++;
				turncount++;
			}
			revers(head, start, curr, next);
			start = next;
			next = next.next;
			if (turncount == 1) {
				head = curr;
			}
			count = 1;
		}
		return head;
	}

	public void revers(ListNode list, ListNode start, ListNode end, ListNode next) {
		// ListNode prev = start;
		ListNode curr = start;
		ListNode currnext = start.next;
		ListNode currnext2 = currnext.next;
		while (currnext2 != next) {
			currnext.next = curr;
			curr = currnext;
			currnext = currnext2;
			currnext2 = currnext2.next;
		}
		currnext.next = start;
		start.next = next;
	} */

}