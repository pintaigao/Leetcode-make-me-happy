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
  let [map, left, count, max] = [{}, 0, 0, 0]; // 使用 Map 数据结构来记录每个元素的出现次数, 滑动窗口的左指针, 滑动窗口内不同元素的数量, 记录最大的窗口大小

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

