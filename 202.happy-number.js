/*
 * @lc app=leetcode id=202 lang=javascript
 *
 * [202] Happy Number
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
    let set = new Set();
    while (true) {
        let sum = 0;
        while (n !== 0) {
            let number = n % 10;
            sum += number * number;
            n = Math.floor(n / 10);
        }
        if (sum === 1) {
            return true;
        }
        if(set.has(sum)) {
            return false;
        }

        n = sum;
        set.add(n);
        console.log(set);
    }
};

isHappy(19);
// @lc code=end

