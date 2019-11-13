/*
 * @lc app=leetcode id=161 lang=javascript
 *
 * [161] One Edit Distance
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isOneEditDistance = function (s, t) {
    let array = new Array(256);
    array.fill(0);
    let sArray = s.split("");
    let tArray = t.split("");    

    for (let i = 0; i < sArray.length; i++) {
        array[sArray[i].charCodeAt()]+=1;
    }
    console.log(array);
    for (let j = 0; j < tArray.length; j++) {
        array[tArray[j].charCodeAt()]-=1;
    }
    console.log(array);
};

isOneEditDistance('1203', '1213');
// @lc code=end
