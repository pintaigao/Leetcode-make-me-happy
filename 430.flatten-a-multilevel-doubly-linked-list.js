/*
 * @lc app=leetcode id=430 lang=javascript
 *
 * [430] Flatten a Multilevel Doubly Linked List
 */
/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function(head) {
    if(head == null) return head;

    let p = head;

    while(p) {
      if(!p.child) {
        p = p.next;
      }
      else {
        let temp = p.child;
        while(temp.next) {
          temp = temp.next;
        }

        temp.next = p.next;
        if(p.next) {
          p.next.prev = temp;
        }

        p.next = p.child;
        p.child.prev = p;
        p.child = null;
      }
    }
    return head;
};