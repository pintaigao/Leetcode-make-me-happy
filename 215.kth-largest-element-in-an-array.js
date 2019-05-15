/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findKthLargest = (nums, k) => {
  return quickSelect(nums, 0, nums.length - 1, k);
};

const quickSelect = (nums, lo, hi, k) => {
  // use quick sort's idea
  // put nums that are <= pivot to the left
  // put nums that are  > pivot to the right
  for (var i = lo, j = lo; j < hi; j++) {
    if (nums[j] <= nums[hi]) {
      swap(nums, i, j);
      i++;
    }
  }

  swap(nums, i, j);
  // count the nums that are >= pivot
  const m = hi - i + 1;
  // pivot is the one!
  if (m === k) return nums[i];
  // pivot is too small, so it must be on the right
  if (m > k) return quickSelect(nums, i + 1, hi, k);
  // pivot is too big, so it must be on the left
  return quickSelect(nums, lo, i - 1, k - m);
};

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

// let result = findKthLargest([3, 2, 1, 5, 6, 4], 2);
// console.log(result);