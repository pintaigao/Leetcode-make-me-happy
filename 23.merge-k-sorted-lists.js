/*
 * @lc app=leetcode id=23 lang=javascript
 *
 * [23] Merge k Sorted Lists
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

// 方法一：Brute Froce
var mergeKLists = function (lists) {

};

// 方法二；Compare one by one
var mergeKLists = function (lists) {
  let min_index = 0;
  let head = new ListNode(0);
  let h = head;
  while (true) {
    let isBreak = true;
    let min = Number.MAX_VALUE;
    for (let i = 0; i < lists.length; i++) {
      if (lists[i]) {
        if (lists[i].val < min) {
          min_index = i;
          min = lists[i].val;
        }
        isBreak = false;
      }
    }

    if (isBreak) {
      break;
    }

    h.next = lists[min_index];
    h = h.next;
    lists[min_index] = lists[min_index].next;
  }

  h.next = null;
  return head.next;
};

