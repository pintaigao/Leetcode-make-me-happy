/*
 * @lc app=leetcode id=138 lang=javascript
 *
 * [138] Copy List with Random Pointer
 */
/**
 * // Definition for a Node.
 * function Node(val,next,random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */
/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function (head) {
  if (!head) return null;
  let map = new Map();
  // 1. 将所有node放进map中
  let cur = head;
  while (cur) {
    map.set(cur, new Node(cur['val'], null, null))
    cur = cur.next;
  }

  cur = head;
  // 2. link random;
  while(cur) {
    map.get(cur).next = map.get(cur.next);
    if (map.get(cur).random) {
      map.get(cur).random = map.get(cur.random);
    }
    cur = cur.next;
  }

  return map.get(head);  
};

// var copyRandomList = function(head) {
//   var dummy = new Node(NaN, null, null)
//   var p = dummy
//   var q = head
//   var map = new Map();
  
//   while(q) {
//       let newNode = new Node(q.val, null, null)
//       p.next = newNode
//       map.set(q, newNode)
      
//       p = p.next
//       q = q.next
//   }
  
//   p = dummy.next
//   q = head
//   while(q) {
//       if (q.random) {
//           p.random = map.get(q.random)
//       }
//       p = p.next
//       q = q.next
//   }
  
//   return dummy.next
// };

