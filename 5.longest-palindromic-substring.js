/*
 * @lc app=leetcode id=5 lang=javascript
 *
 * [5] Longest Palindromic Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
    let left = 0, right = 0;
    for (let i = 0; i < s.length; i++) {
        let pointer1 = i, pointer2 = i;
        while (pointer1 >= 0 && pointer2 < s.length && s[pointer1] === s[pointer2]) {
            pointer1--;
            pointer2++;
        }
        if (right - left < pointer1 - pointer2 - 1) {
            left = pointer1 + 1;
            right = pointer2 - 1;
        }

        pointer1 = i, pointer2 = i + 1;
        while (pointer1 >= 0 && pointer2 < s.length && s[pointer1] === s[pointer2]) {
            pointer1 -= 1;
            pointer2 += 1;
        }

        if (right - left < pointer1 - pointer2 - 1) {
            left = pointer1 + 1;
            right = pointer2 - 1;
        }

    }

    return s.substring(left, right + 1);

};


console.log(longestPalindrome("babad"));


// @lc code=end

