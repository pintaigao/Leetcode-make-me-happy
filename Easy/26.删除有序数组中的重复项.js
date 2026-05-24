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
      // 维护 nums[0..slow] 无重复!!!
      nums[slow] = nums[fast];
    }

    // fast 基本炒作，每一次 fast+=1
    fast++;
  }
  // 数组长度为索引 + 1
  return slow + 1;
};

// 练习
var removeDuplicates2 = function (nums) {
  // I have a current pointer and a next pointer, current pointer is the last unique element, next pointer is the next element to compare with current pointer, if they are equal, next pointer moves forward, if they are not equal, current pointer moves forward and next pointer's value is assigned to current pointer's value
  let current = 0, next = 0;
  while (next < nums.length) {
    if (nums[next] === nums[current]) {
      // If they are equal, next pointer moves forward, find the one that is not equal to current pointer
      next++;
    } else {
      // If they are not equal, current pointer moves forward and next pointer's value is assigned to current pointer's value
      // Why current pointer moves forward?  因为 current 维持着 nums[0..current] 无重复，所以 current 需要往前走一位，来维护这个无重复的状态
      current += 1;
      nums[current] = nums[next];
    }
  }

  return nums
};

removeDuplicates2([0, 1, 1, 1, 2, 2, 3, 3, 4]);