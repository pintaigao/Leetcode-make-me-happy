/*
 * @lc app=leetcode id=148 lang=javascript
 *
 * [148] Sort List
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
 * @return {ListNode}
 */

// Top Down Merge Solution
var sortList = function (head) {
  let merge = function (list1, list2) {
    let dummyHead = new ListNode();
    let tail = dummyHead;
    while (list1 != null && list2 != null) {
      if (list1.val < list2.val) {
        tail.next = list1;
        list1 = list1.next;
        tail = tail.next;
      } else {
        tail.next = list2;
        list2 = list2.next;
        tail = tail.next;
      }
    }
    tail.next = list1 != null ? list1 : list2;
    return dummyHead.next;
  };

  let getMid = function (head) {
    let midPrev = null;
    while (head != null && head.next != null) {
      midPrev = midPrev == null ? head : midPrev.next;
      head = head.next.next;
    }
    let mid = midPrev.next;
    midPrev.next = null;
    return mid;
  };

  if (head == null || head.next == null) return head;
  let mid = getMid(head);
  let left = sortList(head);
  let right = sortList(mid);
  return merge(left, right);
};

// Bottom Up Solution
// @lc code=end

// Bottom Up 的方法
let tail = new ListNode();
let nextSubList = new ListNode();
var sortList = function (head) {
  let split = function (start, size) {
    let midPrev = start;
    let end = start.next;
    //use fast and slow approach to find middle and end of second linked list
    for (
      let index = 1;
      index < size && (midPrev.next != null || end.next != null);
      index++
    ) {
      if (end.next != null) {
        end = end.next.next != null ? end.next.next : end.next;
      }
      if (midPrev.next != null) {
        midPrev = midPrev.next;
      }
    }
    let mid = midPrev.next;
    midPrev.next = null;
    nextSubList = end.next;
    end.next = null;
    // return the start of second linked list
    return mid;
  };

  let merge = function (list1, list2) {
    let dummyHead = new ListNode();
    let newTail = dummyHead;
    while (list1 != null && list2 != null) {
      if (list1.val < list2.val) {
        newTail.next = list1;
        list1 = list1.next;
        newTail = newTail.next;
      } else {
        newTail.next = list2;
        list2 = list2.next;
        newTail = newTail.next;
      }
    }
    newTail.next = list1 != null ? list1 : list2;
    // traverse till the end of merged list to get the newTail
    while (newTail.next != null) {
      newTail = newTail.next;
    }
    // link the old tail with the head of merged list
    tail.next = dummyHead.next;
    // update the old tail to the new tail of merged list
    tail = newTail;
  };

  let getCount = function (head) {
    let cnt = 0;
    let ptr = head;
    while (ptr != null) {
      ptr = ptr.next;
      cnt++;
    }
    return cnt;
  };

  if (head == null || head.next == null) return head;
  let n = getCount(head);
  let start = head;
  let dummyHead = new ListNode();
  for (let size = 1; size < n; size = size * 2) {
    tail = dummyHead;
    while (start != null) {
      if (start.next == null) {
        tail.next = start;
        break;
      }
      let mid = split(start, size);
      merge(start, mid);
      start = nextSubList;
    }
    start = dummyHead.next;
  }
  return dummyHead.next;
};
