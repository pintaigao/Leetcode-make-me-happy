/*
 * @lc app=leetcode id=198 lang=javascript
 *
 * [198] House Robber
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
    let prevMax = 0;
    let currMax = 0;
    for(let i=0;i<nums.length;i++) {
        let temp = currMax;
        currMax = Math.max(prevMax + nums[i], currMax);
        prevMax = temp;
    }  

    return currMax;
};
// @lc code=end

