/*
 * @lc app=leetcode id=227 lang=javascript
 *
 * [227] Basic Calculator II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */

// 1. With Stack 1
var calculate = function (s) {
  if (s == null || s.isEmpty()) return 0;
  let len = s.length();
  let stack = [];
  let currentNumber = 0;
  let operation = "+";
  for (let i = 0; i < len; i++) {
    let currentChar = s.charAt(i);
    if (Character.isDigit(currentChar)) {
      currentNumber = currentNumber * 10 + (currentChar - "0");
    }
    if (
      (!Character.isDigit(currentChar) &&
        !Character.isWhitespace(currentChar)) ||
      i == len - 1
    ) {
      if (operation == "-") {
        stack.unshift(-currentNumber);
      } else if (operation == "+") {
        stack.unshift(currentNumber);
      } else if (operation == "*") {
        stack.unshift(stack.shifit() * currentNumber);
      } else if (operation == "/") {
        stack.unshift(stack.shifit() / currentNumber);
      }
      operation = currentChar;
      currentNumber = 0;
    }
  }
  let result = 0;
  while (stack.length !== 0) {
    result += stack.shifit();
  }
  return result;
};

// Stack 2
let calculate2 = function (s) {
  let stack = [];
  let num = "";
  let sign = null;
  // we loop till the full length of the array to account for last sign
  for (let i = 0; i <= s.length; i++) {
    const curr = s[i];
    //handle space
    if (curr === " ") continue;
    //if char is a number
    if (!isNaN(curr)) num += curr;
    //if we have a  sign + - / *
    if (isNaN(curr)) {
      num = Number(num);
      switch (sign) {
        case "+":
        case null:
          //we push the initial number into the stack
          stack.push(num);
          break;
        case "-":
          //we push any values after the subtraction sign as negative
          stack.push(-num);
          break;
        case "*":
          //we pop the stack then multiply and push back
          stack.push(stack.pop() * num);
          break;
        case "/":
          //we pop the stack then devide and push back
          stack.push(parseInt(stack.pop() / num, 10));
          break;
      }
      // sign becomes current sign
      sign = curr;
      // we reset num
      num = "";
    }
  }
  //we reduce the array adding positive and negative numbers
  return stack.reduce((a, b) => {
    return a + b;
  }, 0);
};

// With Stack 3
let calculate3 = function (s) {
  if (s.length === 0) {
    return 0;
  }

  let op = "+";
  let stack = [];

  for (let i = 0, n = 0; i <= s.length; ++i) {
    let c = s.charAt(i);
    if (c === " ") continue;
    if (c >= "0" && c <= "9") {
      n = n * 10 + parseInt(c);
      continue;
    }
    if (op === "+") {
      stack.push(n);
    } else if (op === "-") {
      stack.push(-n);
    } else if (op === "*") {
      stack.push(stack.pop() * n);
    } else if (op === "/") {
      stack.push(Math.trunc(stack.pop() / n));
    }
    op = c;
    n = 0;
  }
  // return the sum of the stack.
  return stack.reduce((n, acc) => n + acc, 0);
};

// 2. Withdout Stack
var calculate = function (s) {
  let sum = 0;
  let tempSum = 0;
  let num = 0;
  let lastSign = "+";
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (c >= "0" && c <= "9" && c !== " ") num = num * 10 + c - "0";
    if (i == s.length - 1 || !(c >= "0" && c <= "9" && c !== " ")) {
      console.log(c);
      console.log(lastSign);
      switch (lastSign) {
        case "+":
          sum += tempSum;
          console.log(sum, tempSum, num);
          console.log();
          tempSum = num;
          break;
        case "-":
          sum += tempSum;
          tempSum = -num;
          break;
        case "*":
          console.log(tempSum, num);
          tempSum *= num;
          console.log(tempSum);
          console.log();
          break;
        case "/":
          console.log(tempSum, num);
          tempSum = Math.floor(tempSum / num);
          break;
      }
      lastSign = c;
      num = 0;
    }
  }
  sum += tempSum;
  return sum;
};

console.log(calculate(" 3/2 "));
// @lc code=end
