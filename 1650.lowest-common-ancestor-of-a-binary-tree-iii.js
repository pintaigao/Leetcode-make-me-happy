/**
 * // Definition for a Node.
 * function Node(val) {
 *    this.val = val;
 *    this.left = null;
 *    this.right = null;
 *    this.parent = null;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
/* 往上走 */
var lowestCommonAncestor = function (p, q) {
  let seen = new Set();
  while (p != null) {
    seen.add(p);
    p = p.parent;
  }
  while (q != null) {
    if (seen.has(q)) {
      return q;
    }
    q = q.parent;
  }
  return null;
};

/* 链表找交点 */
var lowestCommonAncestor = function (p, q) {
  let curP = p;
  let curQ = q;
  while (curP != curQ) {
    curP = curP == null ? q : curP.parent;
    curQ = curQ == null ? p : curQ.parent;
  }
  return curP;
};
