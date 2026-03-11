var reverseList = function (head) {
  if (head == null || head.next == null) {
    return head;
  }
  // 由于单链表的结构，至少要用三个指针才能完成迭代反转
  // cur 是当前遍历的节点，pre 是 cur 的前驱结点，nxt 是 cur 的后继结点
  var cur = head, nxt = head.next, pre = null;
  while (cur != null) {
    // 逐个结点反转 // 更新指针位置
    cur.next = pre, pre = cur, cur = nxt;
    if (nxt != null) {
      nxt = nxt.next;
    }
  }
  // 返回反转后的头结点
  return pre;
}