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

/* 我比较认同的方法，奇数和偶数 */
var longestPalindrome = function (s) {
    function helper(str, j, k) {
        while (j >= 0 && k < str.length && s[j] == s[k]) {
            j--;
            k++;
        }
        if (maxLen < k - j - 1) {
            lo = j + 1;
            maxLen = k - j - 1;
        }
    }

    let lo = 0, maxLen = 0;
    let len = s.length;
    if (len < 2) return s;
    for (let i = 0; i < len - 1; i++) {
        helper(s, i, i);
        helper(s, i, i + 1);
    }

    return s.substring(lo, lo + maxLen);
};


console.log(longestPalindrome("babad"));


// @lc code=end

