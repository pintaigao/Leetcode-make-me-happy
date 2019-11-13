/*
 * @lc app=leetcode id=92 lang=javascript
 *
 * [92] Reverse Linked List II
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
  let temp = head;
  let t2 = null;
  for (let i = 1; i < m; i++) {
    t2 = temp;
    temp = temp.next;
  }


  let stk = new Array();
  for (let i = m; i <= n; i++) {
    stk.push(temp);
    temp = temp.next;
  }

  /*
  t2 is to be reversed 2->3->4
  temp is after reversed 5->null
  */
  for (let i = m; i <= n; i++) {
    if (t2 == null) {
      t2 = stk.pop();
      head = t2;
    }

    else {

      t2.next = stk.pop();
      t2 = t2.next;
    }
  }
  t2.next = temp;
  return head;
};

