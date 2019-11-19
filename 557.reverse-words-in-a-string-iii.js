/*
 * @lc app=leetcode id=557 lang=javascript
 *
 * [557] Reverse Words in a String III
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

/* 1. 我自己的方法 */
var reverseWords = function (s) {
    let stringArray = s.split(" ");
    stringArray.forEach((item, index) => {
        stringArray[index] = item.split("").reverse().join("");
    });

    return stringArray.join(" ")
};

/* 2. 最优解 */


reverseWords("Let's take LeetCode contest");

// @lc code=end

