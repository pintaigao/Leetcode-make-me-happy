var thirdMax = function (nums) {
  nums.sort((a, b) => a - b);
  nums.reverse();
  for (let i = 1, diff = 1; i < nums.length; ++i) {
    if (nums[i] !== nums[i - 1] && ++diff === 3) { // 此时 nums[i] 就是第三大的数
      return nums[i];
    }
  }
  return nums[0];
};