/*
 * @lc app=leetcode id=162 lang=javascript
 *
 * [162] Find Peak Element
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
// var findPeakElement = function(nums) {
//   if(nums.length === 1) return 0
//   for(let i = 1; i < nums.length - 1; i++) {
//       if(nums[i] > nums[i - 1] && nums[i] > nums[i + 1]) {
//           return i
//       }
//   }

//   if(nums[0] > nums[1])
//       return 0
//   if(nums[nums.length - 1] > nums[nums.length - 2])
//       return nums.length - 1
//   return 0
// };

/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function (nums, lower, upper) {
    
    checkRange = (num1, num2) => {
        console.log(num1, num2);
        if (num1 === num2) {
            return num1 + ""
        } else {
            return num1 + "->" + num2;
        }
    }

    let result = [];
    if(!nums.length){
        result.push(checkRange(lower,upper));
        return result;
    }
    // check first and last
    if (nums[0] !== lower) {
        result.push(checkRange(lower, nums[0] - 1));
    }

    for (let i = 1; i < nums.length; i++) {
        console.log(nums[i] !== nums[i - 1] + 1);
        if (nums[i] !== nums[i - 1] && nums[i] !== nums[i - 1] + 1) {
            let tempResult = checkRange(nums[i - 1] + 1, nums[i] - 1);
            result.push(tempResult);
        }
    }

    // check last
    if (nums.length && nums[nums.length - 1] !== upper) {
        result.push(checkRange(nums[nums.length - 1] + 1, upper))
    }
    console.log(result);

    return result;
};

console.log(findMissingRanges([1,1,1], 1, 1));


