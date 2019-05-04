var lengthOfLIS = function (nums) {
  let list = [];
  for (let i = 0; i < nums.length; i++) {
    if (list.length === 0 || list[list.length - 1] < nums[i]) {
      list.push(nums[i]);
    } else {
      let start = 0;
      let end = list.length - 1;
      while (start < end) {
        const mid = Math.floor((start + end) / 2);
        if (list[mid] < nums[i]) {
          start = mid + 1;
        } else {
          end = mid;
        }
      }
      [list[end], nums[i]] = [nums[i], list[end]];
    }
  }
  return list.length;
};