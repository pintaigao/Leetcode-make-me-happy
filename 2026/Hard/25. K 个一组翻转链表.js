/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
let reverseKGroup = function (head, k) {
  if (head == null) return null;
  // 区间 [a, b) 包含 k 个待反转元素
  let a = head, b = head;
  for (let i = 0; i < k; i++) {
    // 不足 k 个，不需要反转，base case
    if (b == null) return head;
    b = b.next;
  }

  // 反转区间 [a, b) 的元素，注意是左闭右开
  function reverse(a, b) {
    let pre = null, cur = a, nxt = a;
    // while 终止的条件改一下就行了
    while (cur !== b) {
      nxt = cur.next;
      cur.next = pre;
      pre = cur;
      cur = nxt;
    }
    // 返回反转后的头结点
    return pre;
  }
  // 反转前 k 个元素
  let newHead = reverse(a, b);
  // 递归反转后续链表并连接起来
  a.next = reverseKGroup(b, k);
  return newHead;
};

// 练习：
let reverseKGroup10 = function (head, k) {
  let a = head, b = head;
  for (let i = 0; i < k; i++) {
    b = b.next;

    if (b == null) return head;
  }

  function reverse(a, b) {
    let pre = null, cur = a, next = a;
    while (cur != b) {
      next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    }

    return pre;
  }


  let newHead = reverse(a, b);
  a.next = reverseKGroup10(b, k);
  return newHead;
}
