/*
 * @lc app=leetcode id=412 lang=javascript
 *
 * [412] Fizz Buzz
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  // ans list
  let ans = [];

  for (let num = 1; num <= n; num++) {
    let divisibleBy3 = num % 3 == 0;
    let divisibleBy5 = num % 5 == 0;

    if (divisibleBy3 && divisibleBy5) {
      // Divides by both 3 and 5, add FizzBuzz
      ans.push("FizzBuzz");
    } else if (divisibleBy3) {
      // Divides by 3, add Fizz
      ans.push("Fizz");
    } else if (divisibleBy5) {
      // Divides by 5, add Buzz
      ans.push("Buzz");
    } else {
      // Not divisible by 3 or 5, add the number
      ans.push(num + "");
    }
  }

  return ans;
};
// @lc code=end
