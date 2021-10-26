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

// 1. DP的方法 O(n) O(n)
var trap = function (height) {
  if (height == null) return 0;
  let ans = 0;
  let size = height.length;
  let left_max = new Array(size).fill(0),
    right_max = new Array(size).fill(0);
  left_max[0] = height[0];

  // 1. 收集左右两边的最大的
  for (let i = 1; i < size; i++) {
    left_max[i] = Math.max(height[i], left_max[i - 1]);
  }
  right_max[size - 1] = height[size - 1];
  for (let i = size - 2; i >= 0; i--) {
    right_max[i] = Math.max(height[i], right_max[i + 1]);
  }

  // 2. 开始比较
  for (let i = 1; i < size - 1; i++) {
    ans += Math.min(left_max[i], right_max[i]) - height[i];
  }
  return ans;
};

// Approach 3: Using stacks

let trap2 = function (height) {
  let ans = 0,
    current = 0;
  let st = [];
  while (current < height.length) {
    while (st.length && height[current] >= height[st[0]]) {
      let top = st[0];
      st.shift();
      if (st.length == 0) break;
      let distance = current - st[0] - 1;
      let bounded_height =
        Math.min(height[current], height[st[0]]) - height[top];
      ans += distance * bounded_height;
    }
    st.unshift(current);
    current += 1;
  }
  return ans;
};

// Approach 4: Using 2 pointers
let trap3 = function (height) {
  let left = 0,
    right = height.length - 1;
  let ans = 0;
  let left_max = 0,
    right_max = 0;
  while (left < right) {
    if (height[left] < height[right]) {
      height[left] >= left_max
        ? (left_max = height[left])
        : (ans += left_max - height[left]);
      left += 1;
    } else {
      height[right] >= right_max
        ? (right_max = height[right])
        : (ans += right_max - height[right]);
      right -= 1;
    }
  }
  return ans;
};

// @lc code=end
