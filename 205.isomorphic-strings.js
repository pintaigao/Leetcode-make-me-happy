/*
 * @lc app=leetcode id=205 lang=javascript
 *
 * [205] Isomorphic Strings
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {

    if (s.length !== t.length) {
        return false;
    }

    let mapS = {};
    let mapT = {};

    for (let i = 0; i < s.length; i++) {
        let sChar = s[i];
        let tChar = t[i];
        if (mapS[sChar] !== undefined && mapS[sChar] !== tChar) {
            return false;
        }
        if (mapT[tChar] !== undefined && mapT[tChar] !== sChar) {
            return false;
        }
        mapS[sChar] = tChar;
        mapT[sChar] = sChar;
    }
    return true;
};

console.log(isIsomorphic("ab", "aa"));

// @lc code=end

