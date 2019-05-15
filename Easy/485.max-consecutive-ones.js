/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxConsecutiveOnes = function(nums) {
  let max = 0, curr = 0;
  for (let k of nums) {
      max = Math.max(max, curr += k);
      if (!k) curr = 0;
  }
  return max;
};
