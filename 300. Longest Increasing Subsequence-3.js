var lengthOfLIS = function (nums) {
  if (nums.length == 0) return 0;
  var temp = [nums[0]];
  for (var i = 1; i < nums.length; ++i) {
    if (nums[i] > temp[temp.length - 1]) temp.push(nums[i]);
    else if (nums[i] <= temp[0]) temp[0] = nums[i];
    else temp[binarySearch(temp, nums[i], 0, temp.length)]= nums[i];
    console.log(temp);
  }
  return temp.length;
};

function binarySearch(nums, target, low, high) {
  var mid = Math.floor(low, high);
  if (low < high) {
    if (nums[mid] > target) return binarySearch(nums, target, low, mid);
    else if (nums[mid] < target) return binarySearch(nums, target, mid + 1, high);
  }
  return mid;
}

lengthOfLIS([10,9,2,5,3,7,101,1,18,19]);