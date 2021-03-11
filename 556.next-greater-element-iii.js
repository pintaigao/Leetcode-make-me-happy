/*
 * @lc app=leetcode id=556 lang=javascript
 *
 * [556] Next Greater Element III
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var nextGreaterElement = function (n) {
  let number = (n + "").split("");

  let i, j;
  // I) Start from the right most digit and
  // find the first digit that is
  // smaller than the digit next to it.
  for (i = number.length - 1; i > 0; i--) if (number[i - 1] < number[i]) break;

  // If no such digit is found, its the edge case 1. 如果数字是desc order
  if (i == 0) return -1;

  // II) Find the smallest digit on right side of (i-1)'th
  // digit that is greater than number[i-1]
  let x = number[i - 1],
    smallest = i;
  for (j = i + 1; j < number.length; j++)
    if (number[j] > x && number[j] <= number[smallest]) smallest = j;

  // III) Swap the above found smallest digit with
  // number[i-1]
  let temp = number[i - 1];
  number[i - 1] = number[smallest];
  number[smallest] = temp;

  // IV) Sort the digits after (i-1) in ascending order
  var sorted = number.slice(0, i);
  var unsorted = number.slice(i);

  unsorted = unsorted.sort((a, b) => a - b);

  number = [...sorted, ...unsorted];

  let val = parseInt(number.join(""));
  if (val > 2147483647) {
    return -1;
  }

  return val;
};
// @lc code=end
