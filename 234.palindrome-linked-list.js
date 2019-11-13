/*
 * @lc app=leetcode id=234 lang=javascript
 *
 * [234] Palindrome Linked List
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {

    // 1. Get slow
    let fast = head;
    let slow = head;
    while (fast && fast.next) {
        fast = fast.next.next;
        slow = slow.next;
    }

    if (fast) {
        slow = slow.next;
    }
    // 2. Reversed LinkedList
    let prev = null;
    let head2 = null;
    while (slow) {
        head2 = slow;
        slow = slow.next;
        head2.next = prev;
        prev = head2;
    }

    fast = head;
    while (prev) {
        if (prev.val !== fast.val) {
            return false;
        }

        prev = prev.next;
        fast = fast.next;
    }

    return true;


};
// @lc code=end

