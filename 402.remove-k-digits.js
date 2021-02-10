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

  for (let digit of num.split("")) {
    while (stack.length > 0 && k > 0 && stack[stack.length - 1] > digit) {
      stack.pop();
      k -= 1;
    }
    stack.push(digit);
  }

  /* remove the remaining digits from the tail. */
  while (k > 0) {
    stack.pop();
    k -= 1;
  }

  // build the final string, while removing the leading zeros.
  let ret = "";
  let leadingZero = true;
  for (let digit of stack) {
    if (leadingZero && digit == "0") continue;
    leadingZero = false;
    ret += digit;
  }

  /* return the final string  */
  if (ret.length == 0) return "0";
  console.log(ret);
  return ret;
};

removeKdigits("1432219", 3);
// @lc code=end
