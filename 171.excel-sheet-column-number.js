/*
 * @lc app=leetcode id=171 lang=javascript
 *
 * [171] Excel Sheet Column Number
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var titleToNumber = function (s) {

    let charArray = s.split("");
    let result = 0;
    for (let i = 0; i < charArray.length; i++) {
        let index = charArray[i].charCodeAt() - "A".charCodeAt() + 1;
        result += index * Math.pow(26, i);
    }

    return result;
};

// @lc code=end

