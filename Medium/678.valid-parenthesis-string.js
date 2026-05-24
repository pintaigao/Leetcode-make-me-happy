/*
 * @lc app=leetcode id=678 lang=javascript
 *
 * [678] Valid Parenthesis String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
/* 两个Stack */
var checkValidString = function (s) {
  let leftID = [], starID = [];
  for (let i = 0; i < s.length; i++) {
    let ch = s[i];
    if (ch === "(") leftID.unshift(i);
    else if (ch == "*") starID.unshift(i);
    else {
      // 碰到“)”, 如果leftID和starID为空，则返回false，说明多了“)”，否则，leftID或starID移除一个元素
      if (leftID.length == 0 && starID.length == 0) return false;
      if (leftID.length !== 0) leftID.shift();
      else starID.shift();
    }
  }
  // 如果leftID和starID都不为空，如果leftID的长度大于starID，则返回false，说明没有足够的*来匹配“(”
  while (leftID.length !== 0 && starID.length !== 0) {
    // 如果leftID栈顶的位置后于starID栈顶的位置，说明他们是“)(“的形式
    if (leftID.shift() > starID.shift()) return false;
  }
  // 如果leftID不为空，说明多了“(”，返回false，否则true
  return leftID.length == 0;
};

/* Appraoch 2: Space O(1)的做法，Greedy*/
// 从左到右遍历字符串，遍历过程中，未匹配的左括号数量可能会出现如下变化：

// 如果遇到左括号，则未匹配的左括号数量加 1；

// 如果遇到右括号，则需要有一个左括号和右括号匹配，因此未匹配的左括号数量减 1；

// 如果遇到星号，由于星号可以看成左括号、右括号或空字符串，因此未匹配的左括号数量可能加 1、减 1 或不变。

// 基于上述结论，可以在遍历过程中维护未匹配的左括号数量可能的最小值和最大值，根据遍历到的字符更新最小值和最大值：

// 如果遇到左括号，则将最小值和最大值分别加 1；

// 如果遇到右括号，则将最小值和最大值分别减 1；

// 如果遇到星号，则将最小值减 1，将最大值加 1。

// 任何情况下，未匹配的左括号数量必须非负，因此当最大值变成负数时，说明没有左括号可以和右括号匹配，返回 false。

// 当最小值为 0 时，不应将最小值继续减少，以确保最小值非负。

// 遍历结束时，所有的左括号都应和右括号匹配，因此只有当最小值为 0 时，字符串 s 才是有效的括号字符串。
let checkValidString2 = function (s) {
  // min和max表示未匹配的左括号数量可能的最小值和最大值
  let [cmin, cmax] = [0, 0];
  for (let c of s.split("")) {
    if (c === "(") {
      cmax++;
      cmin++;
    } else if (c === ")") {
      cmin = Math.max(cmin - 1, 0);
      cmax--;
      if (cmax < 0) return false;
    } else if (c === "*") {
      /* 如果遇到星号，由于星号可以看成左括号、右括号或空字符串，因此未匹配的左括号数量可能加1、减1或不变。*/
      cmin = Math.max(cmin - 1, 0);
      cmax++;
    }
  }

  return cmin == 0;
};

// @lc code=end
