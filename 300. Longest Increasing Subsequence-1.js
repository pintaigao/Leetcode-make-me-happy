function lengthOfLIS(nums) {
  if (!nums.length) return 0;

  let arr = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) arr[i] = Math.max(arr[i], arr[j] + 1);
    }
  }

  return Math.max(...arr);
}