/*
 * @lc app=leetcode id=1249 lang=javascript
 *
 * [1249] Minimum Remove to Make Valid Parentheses
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
/* Stack 的方法，O(n) O(n) */
var minRemoveToMakeValid = function (s) {
  let [bracketIndex, invalidIndex, result] = [[], new Array(s.length), []];
  for (let i = 0; i < s.length; i++) {
    // 如果遇到左括号
    if (s[i] == "(") {
      bracketIndex.push(i);
      invalidIndex[i] = true;
    }
    // 如果遇到右括号
    if (s[i] == ")") {
      if (!bracketIndex.length) {
        invalidIndex[i] = true;
      } else {
        // 说明找到匹配的了
        invalidIndex[bracketIndex.pop()] = false;
      }
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (!invalidIndex[i]) {
      result.push(s[i]);
    }
  }
  return result.join();
};

/* 非Stack 的方法，计算右括号的个数，O(n) O(1) */
let minRemoveToMakeValid = function (s) {
  // rightKHCount: 尚未遍历的右括号数量
  let [rightKHCount, len] = [0, s.length];
  for (let i = 0; i < len; i++) {
    if (s[i] === ")") rightKHCount += 1;
  }

  let [curLeft, curRight, result] = [0, 0, []];
  // 当遇到左括号时，确认栈中左括号数量+ 1 不大于 栈中右括号数量 + 尚未遍历的右括号数量
  // 当遇到右括号时，确认栈中左括号数量 大于 栈中右括号数量
  for (let i = 0; i < len; i++) {
    if (s[i] == "(") {
      if (curLeft + 1 > curRight + rightKHCount) continue;
      curLeft++;
    } else if (s[i] == ")") {
      rightKHCount--;
      // curLeft=curRight 说明左括号右括号平衡了；curLeft<curRight，说明右括号多了，再多一个无需添加
      if (curLeft <= curRight) continue;
      curRight++;
    }
    result.push(s[i]);
  }
  return result.join("");
};
// @lc code=end
