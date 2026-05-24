/*
 * @lc app=leetcode id=1694 lang=javascript
 *
 * [1694] Reformat Phone Number
 */

// @lc code=start
/**
 * @param {string} number
 * @return {string}
 */
/*
 * @lc app=leetcode id=1694 lang=javascript
 *
 * [1694] Reformat Phone Number
 * 
 * Example 1:
Input: number = "1-23-45 6"
Output: "123-456"
Explanation: The digits are "123456".
Step 1: There are more than 4 digits, so group the next 3 digits. The 1st block is "123".
Step 2: There are 3 digits remaining, so put them in a single block of length 3. The 2nd block is "456".
Joining the blocks gives "123-456".
 */

// @lc code=start
/**
 * @param {string} number
 * @return {string}
 */

/* Solution 1 */
var reformatNumber = function (number) {
  // recursive function to add dashes, needs a string without dashes as input
  let recursiveReformatNumber = function (number) {
    if (number.length <= 3) {
      return number;
    }
    // if length of the string is 4, splt it in two, separated by a dash
    if (number.length == 4) {
      return number.substring(0, 2) + "-" + number.substring(2, 4);
    }
    // take the first three digits add a dash then start the function over with the rest
    else {
      return (
        number.substring(0, 3) +
        "-" +
        recursiveReformatNumber(number.substring(3, number.length))
      );
    }
  };

  // remove all non-numbers (dashes, and spaces)
  return recursiveReformatNumber(number.replace(/\D/g, ""));
};

/* A Solution That I highly will do */
/* Solution 2 */
var reformatNumber2 = function (number) {
  number = number.replace(/\D/g, "");
  let result = "";
  while (number.length) {
    if (number.length > 4) {
      result += number.substring(0, 3) + "-";
      number = number.substring(3, number.length);
    } else if (number.length == 4) {
      return (result += number.substring(0, 2) + "-" + number.substring(2, 4));
    } else {
      return (result += number);
    }
  }
};

/* Testing */
console.log(reformatNumber2("1-23-45 67"));
// @lc code=end
// @lc code=end
