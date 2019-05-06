/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

let count;
var distributeCoins = function (root) {
  count = 0;
  doit(root);
  return count;
};

function doit(root) {
  if (root == null)
    return 0;
  let val = 0;
  let l = doit(root.left);
  let r = doit(root.right);
  val = root.val - 1;
  count += (Math.abs(l)) + (Math.abs(r));
  return val + l + r;

}