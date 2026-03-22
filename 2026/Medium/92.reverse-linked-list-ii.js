/*
 * @lc app=leetcode id=92 lang=javascript
 *
 * [92] Reverse Linked List II
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
  // 定义一个dummyHead, 方便处理
  let dummyHead = new ListNode(0);
  dummyHead.next = head;

  // 初始化指针
  let g = dummyHead;
  let p = dummyHead.next;

  // 将指针移到相应的位置
  for(let step = 0; step < left - 1; step++) {
      g = g.next; p = p.next;
  }

  // 头插法插入节点
  for (let i = 0; i < right - left; i++) {
      let removed = p.next;
      p.next = p.next.next;

      removed.next = g.next;
      g.next = removed;
  }

  return dummyHead.next;
};
// @lc code=end

