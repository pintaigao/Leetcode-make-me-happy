var largestRectangleArea = function (heights) {
  // 在两端各加一个高度为 0 的哨兵，避免边界判断
  // 单调递增栈，存储索引
  let h = [0, ...heights, 0], stk = [], maxArea = 0;
  // 每一个位置，看看栈顶的柱子是不是比当前柱子更高，如果是的话，说明以栈顶柱子为高的矩形已经无法再向右扩展了
  // 则以栈顶柱子为高的矩形的最大宽度就可以确定了，宽度 = 当前索引 - 新栈顶索引(新栈顶的 height绝对比 pop 出来的这个低) - 1
  for (let i = 0; i < h.length; i++) {
    // 遇到比栈顶更矮的柱子，弹出并计算以弹出柱为高的最大矩形
    // 因为相当于找到了一个右边界，所以可以计算以弹出柱为高的最大矩形了
    // 如果当前柱子比栈顶更矮，说明以栈顶柱子为高的矩形已经无法再向右扩展了
    while (stk.length > 0 && h[stk[stk.length - 1]] > h[i]) {
      const height = h[stk.pop()];
      // 宽度 = 当前索引 - 新栈顶索引(新栈顶的 height绝对比 pop 出来的这个低) - 1
      // 相当于执行 “找 heights[i] 左侧第一个更小元素的索引 left“
      const width = i - stk[stk.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stk.push(i);
  }
  return maxArea;
};