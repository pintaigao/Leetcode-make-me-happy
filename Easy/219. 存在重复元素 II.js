var containsNearbyDuplicate = function (nums, k) {
  let left = 0, right = 0, window = new Set();
  // 滑动窗口算法框架，维护一个大小为 k 的窗口
  while (right < nums.length) {
    // 扩大窗口
    if (window.has(nums[right])) {
      return true;
    }
    window.add(nums[right]);
    right++;

    if (right - left > k) {
      // 当窗口的大小大于 k 时，缩小窗口 (保持窗口里面的元素个数不超过 k)
      window.delete(nums[left]);
      left++;
    }
  }
  return false;
};

let containsNearbyDuplicate2 = function (nums, k) {
  let map = new Map();

  for (let i = 0; i < nums.length; i++) {
    if (Math.abs(map.get(nums[i]) - i) <= k) return true;
    map.set(nums[i], i);
  }
  return false;
};


