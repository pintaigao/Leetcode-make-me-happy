/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  let stk = [];
  // 先把所有节点装进栈里，得到倒序结果
  let p = head;
  while (p !== null) {
    stk.push(p);
    p = p.next;
  }

  p = head;
  while (p !== null) {
    // 链表尾部的节点
    let lastNode = stk.pop();
    let next = p.next;
    if (lastNode === next) {
      // 链表为偶数的情况下，1，2，3，4 => 1，4，2，3, 最后一次循环时，lastNode 是 3，next 也是 3，所以满足这个情况
      lastNode.next = null;
      break;
    }

    if (lastNode.next === next) {
      // 链表为基数的情况下，1，2，3，4，5 => 1，5，2，4，3, 最后一次循环时，lastNode 是 4，lastNode.next = 3, next 是 3，所以满足这个情况
      lastNode.next = null;
      break;
    }
    p.next = lastNode;
    lastNode.next = next;
    p = next;
  }
};