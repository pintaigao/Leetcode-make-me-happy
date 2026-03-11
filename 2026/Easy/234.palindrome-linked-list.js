/*
 * @lc app=leetcode id=234 lang=javascript
 *
 * [234] Palindrome Linked List
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
 * @return {boolean}
 */

// 快慢指针法，找到链表中点，反转后半段链表，对比前半段和反转后的后半段是否相同
var isPalindrome = function (head) {
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 处理链表长度为奇数的情况
  if (fast !== null) slow = slow.next;

  // right把后半段链表反转了
  let left = head, right = reverse(slow);
  while (right !== null) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }

  return true;
};

function reverse(head) {
  let pre = null, cur = head;
  while (cur !== null) {
    let next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}

//反转链表对比法的核心是保留原链表，必须先复制再反转，不能直接修改原链表；
var isPalindrome = function (head) {
  let copy = new ListNode();
  let copyCur = copy
  let originCur = head;

  // 复制链表
  while (originCur) {
    copyCur.next = new ListNode(originCur.val)
    copyCur = copyCur.next, originCur = originCur.next;
  }

  // 反转链表
  let revers = reverse(copy.next)

  while (head !== null && revers !== null) {
    if (head.val === revers.val) {
      head = head.next
      revers = revers.next
    } else {
      return false
    }
  }

  return true;
};

//同上，但是复制同时反转链表，减少一次遍历
var isPalindrome = function (head) {
  let copy = null, copyCur = head

  // 复制同时反转链表
  while (copyCur) {
    let node = new ListNode(copyCur.val)
    node.next = copy;
    copy = node;
    copyCur = copyCur.next
  }

  // 不要改变原链表，用新的指针 h 代替
  let h = head;
  while (h !== null) {
    if (h.val === copy.val) {
      h = head.next
      copy = copy.next
    } else {
      return false
    }
  }

  return true;
};
// @lc code=end

