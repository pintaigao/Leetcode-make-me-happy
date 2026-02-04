// 和题目 27 相同
var removeDuplicates = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  let slow = 0, fast = 0;
  while (fast < nums.length) {
    // 如果 nums[fast] == nums[slow]，fast 继续往前走，直到遇到不相等的元素（nums[fast] !== nums[slow]）
    // 更新 slow 指针到下一位，并把 nums[fast] 的值赋给 nums[slow] （这样子nums[slow]不和nums[slow-1]相等）
    if (nums[fast] !== nums[slow]) {
      slow++;
      // 维护 nums[0..slow] 无重复
      nums[slow] = nums[fast];
    }
    fast++;
  }
  // 数组长度为索引 + 1
  return slow + 1;
};