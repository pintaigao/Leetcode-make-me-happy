/*
 * @lc app=leetcode id=86 lang=javascript
 *
 * [86] Partition List
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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
  // 存放小于 x 的链表的虚拟头结点
  // 存放大于等于 x 的链表的虚拟头结点
  // p1, p2 指针负责生成结果链表
  // p 负责遍历原链表，类似合并两个有序链表的逻辑
  // 这里是将一个链表分解成两个链表
  let dummy1 = new ListNode(-1), dummy2 = new ListNode(-1), p1 = dummy1, p2 = dummy2, p = head;
  while (p !== null) {
    if (p.val >= x) {
      p2.next = p;
      p2 = p2.next;
      // p2.next = null; // 这样不行，相当于 p.next = null; 断开了原链表中的节点
    } else {
      p1.next = p;
      p1 = p1.next;
      // p1.next = null; // 和上面同理，不能断开原链表中的节点
    }
    // 不能直接让 p 指针前进(不能 p = p.next)
    // 断开原链表中的每个节点的 next 指针
    // let temp = p.next;
    // p.next = null;
    p = p.next;
  }
  // 连接两个链表
  p1.next = dummy2.next;

  return dummy1.next;
};
// @lc code=end


// 如果按照我的思路，p2.next = null
var partition = function (head, x) {
  let dummy1 = new ListNode(-1), dummy2 = new ListNode(-1), p1 = dummy1, p2 = dummy2, p = head;
  while (p !== null) {
    // 1.先保存 p.next 的值
    let next = p.next;

    if (p.val >= x) {
      p2.next = p;
      p2 = p2.next;
      p2.next = null; // 2.再断开原链表中的节点
    } else {
      p1.next = p;
      p1 = p1.next;
      p1.next = null;
    }

    // 3.最后让 p 指针 = next
    p = next;
  }
  // 连接两个链表
  p1.next = dummy2.next;

  return dummy1.next;
};
// @lc code=end
