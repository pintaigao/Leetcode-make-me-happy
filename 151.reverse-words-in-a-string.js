/*
 * @lc app=leetcode id=151 lang=javascript
 *
 * [151] Reverse Words in a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

/* 这一题的难点在于？ */


/* 1. 我自己的解 */
var reverseWords = function (s) {
    let result = [];
    let stringArr = s.split(" ");

    for (let i = 0; i < stringArr.length; i++) {
        if (stringArr[i] === "") continue;
        result.push(stringArr[i]);
    }
    console.log(result);
    return result.reverse().join(" ");
};

/* split 然后从后面往前也可以 */

reverseWords("  hello world!  ");

/* 2. 最优解 */
// @lc code=end

