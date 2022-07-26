/*
 * @lc app=leetcode id=41 lang=javascript
 *
 * [41] First Missing Positive
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

/* Hash Table (空间不符合要求)*/
var firstMissingPositive = function (nums) {
  let len = nums.length;

  let hashSet = new Set(nums);

  for (let i = 1; i <= len; i++) {
    if (!hashSet.has(i)) {
      return i;
    }
  }

  return len + 1;
};

/* 二分查找（时间复杂度不符合要求）*/
var firstMissingPositive = function (nums) {
  let len = nums.length;
  Arrays.sort(nums, (a, b) => a - b);

  let binarySearch = function (target) {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      let mid = parseInt((left + right) / 2);
      if (nums[mid] == target) {
        return mid;
      } else if (nums[mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return -1;
  };

  for (let i = 1; i <= len; i++) {
    let res = binarySearch(i);
    if (res == -1) {
      return i;
    }
  }
  return len + 1;
};

/* 排序 */
var firstMissingPositive = function (nums) {
  let len = nums.length;
  nums.sort((a, b) => a - b);

  let pre = 0;

  for (let i = 0; i <= len; i++) {
    if (nums[i] <= 0 || nums[i] == pre) {
      continue; // 跳过非正整数和重复值
    } else if (nums[i] > pre + 1) {
      break; // 找到第一个突变的元素
    }
    pre++; // nums[i] == pre + 1
  }
  return pre + 1;
};

/* 将数组视为哈希表 */
var firstMissingPositive = function (nums) {
  let len = nums.length;
  let swap = (index1, index2) => {
    let temp = nums[index1];
    nums[index1] = nums[index2];
    nums[index2] = temp;
  };

  for (let i = 0; i < len; i++) {
    while (nums[i] > 0 && nums[i] <= len && nums[nums[i] - 1] != nums[i]) {
      // 满足在指定范围内、并且没有放在正确的位置上，才交换
      // 例如：数值 3 应该放在索引 2 的位置上
      swap(nums[i] - 1, i);
    }
  }

  // [1, -1, 3, 4]
  for (let i = 0; i < len; i++) {
    if (nums[i] != i + 1) {
      return i + 1;
    }
  }
  // 都正确则返回数组长度 + 1
  return len + 1;
};
// @lc code=end
