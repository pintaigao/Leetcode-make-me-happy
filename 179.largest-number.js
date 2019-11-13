/*
 * @lc app=leetcode id=179 lang=javascript
 *
 * [179] Largest Number
 */
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
  var sorted = nums.sort(function(a, b) {
      console.log(a, b);
      var ab = a.toString() + b.toString();
      var ba = b.toString() + a.toString();
      console.log(ba - ab);
      return ba - ab;
  });

  var joined = sorted.join('');
  if (parseInt(joined) === 0) {
      return '0';
  } else {
      return joined;
  }
};

console.log(largestNumber([3,30,34,5,9]));
