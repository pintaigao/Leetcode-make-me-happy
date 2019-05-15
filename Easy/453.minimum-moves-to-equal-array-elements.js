/**
 * @param {number[]} nums
 * @return {number}
 */
var minMoves = function(nums) {
  if (nums.length == 0) return 0;
  let min = nums[0];
  for (let n of nums) min = Math.min(min, n);
  let res = 0;
  for (let n of nums) res += n - min;
  return res;
};

minMoves([1,2,3]);