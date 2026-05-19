/*
 * @lc app=leetcode id=904 lang=javascript
 *
 * [904] Fruit Into Baskets
 */

// @lc code=start
/**
 * @param {number[]} tree
 * @return {number}
 */
var totalFruit = function (tree) {
  let map = {}, left = 0, count = 0, max = 0; // 使用 Map 数据结构来记录每个元素的出现次数, 滑动窗口的左指针, 滑动窗口内不同元素的数量, 记录最大的窗口大小

  for (let right = 0; right < tree.length; right++) { // 右指针从数组的起始位置开始遍历
    const c = tree[right];
    map[c] = (map[c] || 0) + 1; // 将当前元素出现次数加 1，并存入 Map 中

    if (map[c] === 1) { // 如果当前元素是第一次出现，说明窗口内又多了一个不同的元素
      count++;
    }

    while (count > 2) { // 如果窗口内不同元素的数量大于 2，说明窗口需要左移
      const d = tree[left];
      map[d] = map[d] - 1; // 左指针向右移动，将相应元素的出现次数减 1
      if (map[d] === 0) { // 如果某个元素的出现次数为 0，说明它已经不在窗口内了，需要将不同元素的数量 count 减 1
        count--;
      }
      left++; // 左指针向右移动
    }

    max = Math.max(max, right - left + 1); // 在移动过程中记录窗口大小的最大值
  }

  return max; // 返回窗口大小的最大值，即为题目所求的答案
};
// @lc code=end

// 快的方法
var totalFruit10 = function (fruits) {
  let slow = 0, maxLen = 0, basket = new Map();

  for (let fast = 0; fast < fruits.length; fast++) {
    // 1. 移入新水果
    basket.set(fruits[fast], (basket.get(fruits[fast]) || 0) + 1);

    // 2. 只有当种类超过 2 时，才移动左边界
    // 注意：这里用 if 代替 while 是一种略微不同的策略：
    // 这种策略下，窗口大小代表了曾经出现过的“最大合规窗口”
    if (basket.size > 2) {
      const leftFruit = fruits[slow];
      basket.set(leftFruit, basket.get(leftFruit) - 1);
      // 这个窗口里面只有一个
      if (basket.get(leftFruit) === 0) {
        basket.delete(leftFruit);
      }
      slow++;
    }

    // 3. 更新结果
    // 如果使用 if 策略，maxLen 其实可以直接由 fruits.length - slow 计算
    // 但为了逻辑清晰，用普通的滑窗逻辑如下：
    maxLen = fast - slow + 1;
  }

  return maxLen;
};

