/*
 * @lc app=leetcode id=402 lang=javascript
 *
 * [402] Remove K Digits
 */

// @lc code=start
/**
 * @param {string} num
 * @param {number} k
 * @return {string}
 */
var removeKdigits = function (num, k) {
  let stack = [];

  for (let digit of num) {
    // 现在这个num小于stack的头元素，那么就把stack的头元素弹出，直到头元素比现在这个小
    while (stack.length > 0 && k > 0 && stack[0] > digit) {
      stack.shift();
      k -= 1;
    }

    //放入现在这个元素
    stack.unshift(digit);
  }

  // 如果k不为0，那么就把stack的头k个元素弹出
  while (k > 0) {
    stack.shift();
    k -= 1;
  }

  // build the final string, while removing the leading zeros.
  let ret = "";
  let leadingZero = true;
  for (let digit of stack.reverse()) {
    if (leadingZero && digit == "0") continue;
    leadingZero = false;
    ret += digit;
  }

  /* return the final string  */
  return ret.length ? ret : "0";
};
// @lc code=end


// 练习
var removeKdigits10 = function (num, k) {
  let stk = [];
  // 单调栈：一个栈，每个元素都试试放入，如果要实现递增，则元素进来的时候要和栈顶的元素比较（然后选择移除还是不移除栈顶的元素）
  for (let c of num) {
    // 单调栈代码模板
    while (stk.length > 0 && c < stk[stk.length - 1] && k > 0) {
      stk.pop();
      k--;
    }
    // 防止 0 作为数字的开头
    if (stk.length === 0 && c === '0') {
      continue;
    }
    stk.push(c);
  }

  // 此时栈中元素单调递增，若 k 还没用完的话删掉栈顶元素
  while (k > 0 && stk.length > 0) {
    stk.pop();
    k--;
  }
  // 若最后没剩下数字，就是 0
  if (stk.length === 0) {
    return "0";
  } else {
    return stk.join('');
  }
};