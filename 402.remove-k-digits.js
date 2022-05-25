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
