/*
 * @lc app=leetcode id=224 lang=javascript
 *
 * [224] Basic Calculator
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
    let stack = [];
    let index = 0;
    let carry = 0;
    let signal = 1;
    let result = 0;
    while (index < s.length) {
        if (s[index] - '0' >= 0 && s[index] - '9' <= 0 && s[index] !== " ") {
            carry = carry * 10 + (s[index] - '0');
        } else if (s[index] === "+") {
            result += signal * carry;
            signal = 1;
            carry = 0;
        } else if (s[index] === "-") {
            result += signal * carry;
            signal = -1;
            carry = 0;
        } else if (s[index] === "(") {
            stack.unshift(result);
            stack.unshift(signal);
            signal = 1;
            result = 0;
        } else if (s[index] === ")") {
            result += carry * signal;
            result *= stack.shift();
            result += stack.shift();
            carry = 0;
        }
        index++;
    }
    return result + (signal * carry);
};

// console.log(calculate("1-(5)"));
// @lc code=end

