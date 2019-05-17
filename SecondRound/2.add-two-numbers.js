/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let c1 = l1;
  let c2 = l2;
  let sentinel = new ListNode(0);
  let d = sentinel;
  let sum = 0;
  while (c1 !== null || c2 !== null) {
    sum = Math.floor(sum / 10);
    if (c1 !== null) {
      sum += c1.val;
      c1 = c1.next;
    }

    if (c2 !== null) {
      sum += c2.val;
      c2 = c2.next;
    }

    d.next = new ListNode(sum % 10);
    d = d.next;
  }

  if (Math.floor(sum / 10) === 1) {
    d.next = new ListNode(1);
  }

  return sentinel.next;
};
