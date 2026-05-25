/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  var fast = head, slow = head;
  while (fast && fast.next) {

    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow
    }
  }
  return null
};

var detectCycle = function (head) {
  let fast, slow;
  fast = slow = head;
  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast == slow) break;
  }
  // 上面的代码类似 hasCycle 函数
  if (fast === null || fast.next === null) {
    // fast 遇到空指针说明没有环
    return null;
  }

  // 重新指向头结点
  slow = head;
  // 快慢指针同步前进，相交点就是环起点
  while (slow !== fast) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
};