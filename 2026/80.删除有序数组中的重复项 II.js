var removeDuplicates = function (nums) {
  const n = nums.length;
  if (n <= 2) {
    return n;
  }
  let slow = 2, fast = 2; // slow => nums[0...slow-1] 是处理好的数组, nums[slow] 是待处理的位置
  while (fast < n) {
    // nums[fast] != nums[slow - 2] 在当前结果数组中，最近的两个元素是否都等于 nums[fast]？
    if (nums[fast] != nums[slow - 2]) {
      nums[slow] = nums[fast];
      ++slow;
    }
    ++fast;
  }
  return slow;
};

removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3])