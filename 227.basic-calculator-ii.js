/*
 * @lc app=leetcode id=227 lang=javascript
 *
 * [227] Basic Calculator II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
    let sum = 0;
    let tempSum = 0;
    let num = 0;
    let lastSign = '+';
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        if (c >= '0' && c <= '9' && c !== " ") num = num * 10 + c - '0';
        if (i == s.length - 1 || !(c >= '0' && c <= '9' && c !== ' ')) {
            console.log(c);
            console.log(lastSign);
            switch (lastSign) {
                case '+':
                    sum += tempSum;
                    console.log(sum,tempSum,num);
                    console.log();
                    tempSum = num;
                    break;
                case '-':
                    sum += tempSum;
                    tempSum = -num;
                    break;
                case '*':
                    console.log(tempSum,num);
                    tempSum *= num;
                    console.log(tempSum);
                    console.log();
                    break;
                case '/':
                    console.log(tempSum,num);
                    tempSum = Math.floor(tempSum / num);
                    break;
            }
            lastSign = c;
            num = 0;
        }
    }
    sum += tempSum;
    return sum;
};

console.log(calculate(" 3/2 "));
// @lc code=end

