/*
 * @lc app=leetcode id=116 lang=javascript
 *
 * [116] Populating Next Right Pointers in Each Node
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
/* BFS */
var connect = function (root) {
  if (root == null) {
    return root;
  }
  let queue = [root];
  while (queue.length) {
    //将队列中的元素串联起来
    let [size, tmp] = [queue.length, queue[0]];
    for (let i = 1; i < size; ++i) {
      tmp.next = queue[i];
      tmp = queue[i];
    }
    //遍历队列中的每个元素，将每个元素的左右节点也放入队列中
    for (let i = 0; i < size; ++i) {
      tmp = queue.shift();
      if (tmp.left != null) {
        queue.push(tmp.left);
      }
      if (tmp.right != null) {
        queue.push(tmp.right);
      }
    }
  }
  return root;
};

/* 迭代解法二 空间O(1)*/
var connect = function (root) {
  if (root == null) {
    return root;
  }

  let pre = root;
  //循环条件是当前节点的left不为空，当只有根节点
  //或所有叶子节点都出串联完后循环就退出了
  while (pre.left != null) {
    let tmp = pre;
    while (tmp != null) {
      //将tmp的左右节点都串联起来
      //注:外层循环已经判断了当前节点的left不为空
      tmp.left.next = tmp.right;
      //下一个不为空说明上一层已经帮我们完成串联了
      if (tmp.next != null) {
        tmp.right.next = tmp.next.left;
      }
      //继续右边遍历
      tmp = tmp.next;
    }
    //从下一层的最左边开始遍历
    pre = pre.left;
  }
  return root;
};
// @lc code=end

