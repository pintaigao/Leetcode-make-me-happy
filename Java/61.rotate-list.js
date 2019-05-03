/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
	if (!head || !k) {
		return head
	}

	let len = 1
	let tail = head
	while (tail.next) {
		len += 1
		tail = tail.next
	}

	k = len - (k % len)

	if (k == len) {
		return head
	}

	let ret = head
	while (k > 1) {
		k -= 1
		ret = ret.next
	}

	const retHead = ret.next
	ret.next = null
	tail.next = head

	return retHead
};