/*
 * @lc app=leetcode id=239 lang=javascript
 *
 * [239] Sliding Window Maximum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
/* 单调队列  */
var maxSlidingWindow = function (nums, k) {
  /* 单调双端队列:队尾->队头递增  头[3,2,1]尾*/
  let len = nums.length;
  let res = new Array(len - k + 1).fill(0);
  let que = [];
  // 初始化首个窗口[0,k-1]
  for (let i = 0; i < k; i++) {
    // 新进来的元素>队尾,队尾就要弹出
    while (que.length && nums[i] > que[que.length - 1]) que.pop();
    // 直至新元素<=队尾可以加入
    que.push(nums[i]);
  }
  // 第一个窗口最大元素已经找到
  let index = 0;
  res[index] = que[0];
  index += 1;
  // 继续求解接下来的窗口
  for (let i = k; i < len; i++) {
    // nums[i]即将要加入窗口;nums[i-k]即将退出窗口
    while (que.length && nums[i] > que[que.length - 1]) que.pop();
    // 当前元素入队
    que.push(nums[i]);
    // 退出窗口的元素如果和队头相等,那么队头也要出队
    if (nums[i - k] == que[0]) que.shift();
    // 更新当前窗口最大值
    res[index] = que[0];
    index += 1;
  }
  return res;
};

/* 单调队列 */
let maxSlidingWindow = function (nums, k) {
  if (nums == null || nums.length < 2) return nums;
  // 双向队列 保存当前窗口最大值的数组位置 保证队列中数组位置的数值按从大到小排序
  let queue = [];
  // 结果数组
  let result = new Array(nums.length - k + 1).fill(0);
  // 遍历nums数组
  for (let i = 0; i < nums.length; i++) {
    // 保证从大到小 如果前面数小则需要依次弹出，直至满足要求
    while (queue.length && nums[queue[queue.length - 1]] <= nums[i]) {
      queue.pop();
    }
    // 添加当前值对应的数组下标
    queue.push(i);
    // 判断当前队列中队首的值是否有效(是不是在k个窗口里面的，且k个窗口里面最大的)
    if (queue[0] < i + 1 - k) {
      queue.shift(); // 如果不是就把它拿出来
    }
    // 当窗口长度为k时 开始保存当前窗口中最大值
    if (i + 1 >= k) {
      result[i + 1 - k] = nums[queue[0]];
    }
  }
  return result;
};

// @lc code=end
