import java.util.Comparator;
import java.util.PriorityQueue;

/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
	public ListNode mergeKLists(ListNode[] lists) {
		if (lists.length == 0 || lists == null) {
			return null;
		}
		PriorityQueue<ListNode> pq = new PriorityQueue<>(lists.length, new Comparator<ListNode>() {
			@Override
			public int compare(ListNode l1, ListNode l2) {
				return l1.val - l2.val;
			}
		});

		ListNode dummy = new ListNode(0);
		ListNode tail = dummy;

		for (ListNode list : lists) {
			if (list != null) {
				pq.add(list);
			}
		}

		while (!pq.isEmpty()) {
			tail.next = pq.poll();
			tail = tail.next;
			if (tail.next != null) {
				pq.add(tail.next);
			}
		}
		return dummy.next;
	}
}