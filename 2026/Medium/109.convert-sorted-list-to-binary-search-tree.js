/*
 * @lc app=leetcode id=109 lang=javascript
 *
 * [109] Convert Sorted List to Binary Search Tree
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
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */

/* 解法1：将有序链表转成有序数组 */
var sortedListToBST = function (head) {
  const arr = [];
  while (head) { // 将链表节点的值逐个推入数组arr
    arr.push(head.val);
    head = head.next;
  }
  // 根据索引start到end的子数组构建子树
  const buildBST = (start, end) => {
    if (start > end) return null;        // 指针交错，形成不了子序列，返回null节点
    const mid = (start + end) >>> 1;     // 求中间索引 中间元素是根节点的值
    const root = new TreeNode(arr[mid]); // 创建根节点
    root.left = buildBST(start, mid - 1); // 递归构建左子树
    root.right = buildBST(mid + 1, end);  // 递归构建右子树
    return root;                          // 返回当前子树
  };

  return buildBST(0, arr.length - 1);  // 根据整个arr数组构建
};

/* 解法2：快慢指针 */
const sortedListToBST2 = (head) => {
  if (head == null) return null;
  let slow = head;
  let fast = head;
  let preSlow; // 保存slow的前一个节点

  while (fast && fast.next) {
    preSlow = slow;        // 保存当前slow
    slow = slow.next;      // slow走一步
    fast = fast.next.next; // fast走两步
  }
  const root = new TreeNode(slow.val);     // 根据slow指向的节点值，构建节点

  if (preSlow != null) {   // 如果preSlow有值，即slow左边有节点，需要构建左子树
    preSlow.next = null;   // 切断preSlow和中点slow
    root.left = sortedListToBST(head);     // 递归构建左子树
  }
  root.right = sortedListToBST(slow.next); // 递归构建右子树
  return root;
};

// @lc code=end
var sortedListToBST = function (head) {
  // 解法三、通过中序遍历特点写出的解法
  let len = 0, cur = head;
  for (let p = head; p != null; p = p.next) {
    len++;
  }

  function inorderBuild(left, right) {
    if (left > right) {
      return null;
    }
    let mid = Math.floor((left + right) / 2);
    // 构造左子树
    let root = new TreeNode(cur.val);
    let leftTree = inorderBuild(left, mid - 1);
    // 构造根节点
    cur = cur.next;
    // 构造右子树
    let rightTree = inorderBuild(mid + 1, right);
    // 将左右子树接到根节点上
    root.left = leftTree;
    root.right = rightTree;
    return root;
  }

  return inorderBuild(0, len - 1);
};

var sortedListToBST_2 = function (head) {
  // 解法二、通过找链表中点的方式写出的解法
  function build(begin, end) {
    // 把链表左闭右开区间 [begin, end) 的节点构造成 BST
    if (begin === end) {
      // 因为是左闭右开区间，所以现在已经成空集了
      return null;
    }
    let mid = getMid(begin, end);
    let root = new TreeNode(mid.val);
    root.left = build(begin, mid);
    root.right = build(mid.next, end);
    return root;
  }

  function getMid(begin, end) {
    // 获取链表左闭右开区间 [begin, end) 的中心节点
    let slow = begin, fast = begin;
    while (fast !== end && fast.next !== end) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }

  return build(head, null);
};

