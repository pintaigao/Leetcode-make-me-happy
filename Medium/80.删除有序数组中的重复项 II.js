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
      slow += 1;
    }

    fast += 1;
  }
  return slow;
};

removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3])

// 练习
var removeDuplicates2 = function (nums) {
  let index = 0, count = 0, sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === nums[index] && count === 2) {
      continue;
    }

    if (nums[i] !== nums[index]) {
      index = i;
      count = 0;
    }

    if (nums[i] === nums[index]) {
      count += 1;
      sum += 1;
    }

    console.log(count);

  }

  console.log(sum);


  return sum;
}

removeDuplicates2([0, 0, 1, 1, 1, 1, 2, 3, 3])

// 练习 2
var removeDuplicates3 = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  // 快慢指针，维护 nums[0..slow] 为结果子数组
  let slow = 0, fast = 0;
  // 记录一个元素重复的次数
  let count = 0;
  while (fast < nums.length) {
    if (nums[fast] !== nums[slow] || (slow < fast && count < 2)) {
      // 此时，对于 nums[0..slow] 来说，nums[fast] 是一个新的元素，加进来
      // 此时，对于 nums[0..slow] 来说，nums[fast] 重复次数小于 2，也加进来
      slow++;
      nums[slow] = nums[fast];
    }
    fast++;
    count++;
    if (fast < nums.length && nums[fast] !== nums[fast - 1]) {
      // fast 遇到新的不同的元素时，重置 count
      count = 0;
    }
  }
  // 数组长度为索引 + 1
  return slow + 1;
};