/*
 * @lc app=leetcode id=138 lang=javascript
 *
 * [138] Copy List with Random Pointer
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
/* 用Map */
var copyRandomList = function (head) {
  if (!head) return null;
  let map = new Map();
  // 1. 将所有node放进map中
  let cur = head;
  while (cur) {
    map.set(cur, new Node(cur["val"], null, null));
    cur = cur.next;
  }

  cur = head;
  // 2. 再把random连起来;
  while (cur) {
    map.get(cur).next = map.get(cur.next);
    if (map.get(cur).random) {
      map.get(cur).random = map.get(cur.random);
    }
    cur = cur.next;
  }

  return map.get(head);
};
// @lc code=end
