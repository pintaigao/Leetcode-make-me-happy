/*
 * @lc app=leetcode id=103 lang=javascript
 *
 * [103] Binary Tree Zigzag Level Order Traversal
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
/* 一:BFS的方法 */
var zigzagLevelOrder = function (root) {
  let [res, queue, leftToRight] = [[], [root], true]; //先把节点加入到队列中 & 第一步先从左边开始打印
  if (root == null) return res;
  while (queue.length) {
    //记录每层节点的值
    let level = []
    //统计这一层有多少个节点
    let count = queue.length;
    //遍历这一层的所有节点，把他们全部从队列中移出来，顺便
    //把他们的值加入到集合level中，接着再把他们的子节点（如果有）
    //加入到队列中
    for (let i = 0; i < count; i++) {
      //poll移除队列头部元素（队列在头部移除，尾部添加）
      let node = queue.shift();
      //判断是从左往右打印还是从右往左打印,如果从左边打印，直接把访问的节点值加入到列表level的末尾即可
      // 如果是从右边开始打印，每次要把访问的节点值加入到列表的最前面
      leftToRight ? level.push(node.val) : level.unshift(node.val);
      //左右子节点如果不为空会被加入到队列中
      if (node.left != null)
        queue.push(node.left);
      if (node.right != null)
        queue.push(node.right);
    }
    //把这一层的节点值加入到集合res中
    res.push(level);
    //改变下次访问的方向
    leftToRight = !leftToRight;
  }
  return res;
};

/* 二：DFS的方法 */
var zigzagLevelOrder2 = function (root) {
  let res = [];

  function travel(cur, level) {
    if (cur == null)
      return;
    //如果res.size() <= level说明下一层的集合还没创建，所以要先创建下一层的集合
    if (res.length <= level) {
      let newLevel = [];
      res.push(newLevel);
    }
    //遍历到第几层我们就操作第几层的数据
    let list = res[level];
    //这里默认根节点是第0层，偶数层相当于从左往右遍历，
    // 所以要添加到集合的末尾，如果是奇数层相当于从右往左遍历，
    // 要把数据添加到集合的开头
    if (level % 2 == 0)
      list.push(cur.val);
    else
      list.unshift(cur.val);
    //分别遍历左右两个子节点，到下一层了，所以层数要加1
    travel(cur.left, level + 1);
    travel(cur.right, level + 1);
  }

  travel(root, 0);
  return res;
}

// @lc code=end

