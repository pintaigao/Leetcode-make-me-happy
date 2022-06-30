/*
 * @lc app=leetcode id=42 lang=javascript
 *
 * [42] Trapping Rain Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */

/* 一：按行数求 */
var trap = function (height) {
  let sum = 0;
  //找到最大的高度，以便遍历。
  let max = 0;
  for (let i = 0; i < height.length; i++) {
    if (height[i] > max) {
      max = height[i];
    }
  }

  // 从height=1开始loop
  for (let i = 1; i <= max; i++) {
    let isStart = false; //标记是否开始更新 temp
    let temp_sum = 0;
    // 每一行从原点开始
    for (let j = 0; j < height.length; j++) {
      if (isStart && height[j] < i) {
        temp_sum++;
      }
      if (height[j] >= i) {
        sum = sum + temp_sum;
        temp_sum = 0;
        isStart = true;
      }
    }
  }
  return sum;
};

/* 按列求
 * 每一列的水，我们只需要关注当前列，以及左边最高的墙，右边最高的墙就够了。
 */
let trap = function (height) {
  let sum = 0;
  //最两端的列不用考虑，因为一定不会有水。所以下标从 1 到 length - 2
  for (let i = 1; i < height.length - 1; i++) {
    let [max_left, max_right] = [0, 0];
    // 从该点开始，找出左边最高
    for (let j = i - 1; j >= 0; j--) {
      if (height[j] > max_left) {
        max_left = height[j];
      }
    }
    //从该点开始，找出右边最高
    for (let j = i + 1; j < height.length; j++) {
      if (height[j] > max_right) {
        max_right = height[j];
      }
    }
    //找出两端较小的
    let min = Math.min(max_left, max_right);
    //只有较小的一段大于当前列的高度才会有水，其他情况不会有水
    if (min > height[i]) {
      sum = sum + (min - height[i]);
    }
  }
  return sum;
};

/* 三: 动态规划
 * 从上一个题解可以看出，对于每一列，我们求它左边最高的墙和右边最高的墙，都是重新遍历一遍所有高度，这里我们可以优化一下。
 * 即提前得知每个位置
 */
let trap = function (height) {
  let [sum, max_left, max_right] = [0, new Array(height.length).fill(0), new Array(height.length).fill(0)];

  // 对于i这个位置，每个位置的值为它左边最高的墙的高度
  for (let i = 1; i < height.length - 1; i++) {
    // 这个位置的值是它前一个的墙高还是它左边最高的高
    max_left[i] = Math.max(max_left[i - 1], height[i - 1]);
  }

  // 对于i这个位置，每个位置的值为它右边最高的墙的高度
  for (let i = height.length - 2; i >= 0; i--) {
    max_right[i] = Math.max(max_right[i + 1], height[i + 1]);
  }

  // 然后对于所有的位置，单看这一列，
  for (let i = 1; i < height.length - 1; i++) {
    let min = Math.min(max_left[i], max_right[i]);
    if (min > height[i]) {
      sum = sum + (min - height[i]);
    }
  }
  return sum;
};

/* 四：双指针 */
let trap = function (height) {
  let sum = 0;
  let max_left = 0;
  let max_right = 0;
  let left = 1;
  let right = height.length - 2; // 加右指针进去
  for (let i = 1; i < height.length - 1; i++) {
    //从左到右更
    if (height[left - 1] < height[right + 1]) {
      max_left = Math.max(max_left, height[left - 1]);
      let min = max_left;
      if (min > height[left]) {
        sum = sum + (min - height[left]);
      }
      left++;
      //从右到左更
    } else {
      max_right = Math.max(max_right, height[right + 1]);
      let min = max_right;
      if (min > height[right]) {
        sum = sum + (min - height[right]);
      }
      right--;
    }
  }
  return sum;
};

/* 五：Stack */
let trap = function (height) {
  let sum = 0;
  let stack = [];
  let current = 0;
  while (current < height.length) {
    //如果栈不空并且当前指向的高度大于栈顶高度就一直循环
    while (stack.length && height[current] > height[stack[0]]) {
      let h = height[stack[0]]; //取出要出栈的元素
      stack.shift(); //出栈
      if (!stack.length) {
        // 栈空就出去
        break;
      }
      let distance = current - stack[0] - 1; //两堵墙之前的距离。
      let min = Math.min(height[stack[0]], height[current]);
      sum = sum + distance * (min - h);
    }
    stack.unshift(current); //当前指向的墙入栈
    current++; //指针后移
  }
  return sum;
};
// @lc code=end
