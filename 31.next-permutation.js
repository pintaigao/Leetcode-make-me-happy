/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {

  function swap(a, b) {
    const temp = nums[a]
    nums[a] = nums[b]
    nums[b] = temp
  }
  
  function reverse(start) {
    let end = nums.length - 1
    while (start < end) {
        swap(start, end)
        start++
        end--
    }
  }
  

  let i = nums.length - 2;
  while (i >= 0 && nums[i + 1] <= nums[i]) {
      i--;
  }

  console.log(i);
  if (i < 0) {
      reverse(0);
      return;
  }

  let j = nums.length - 1;
  while (j >= 0 && nums[j] <= nums[i]) {
      j--;
  }

  console.log(j)
  swap(i, j);
  reverse(i + 1);
};

nextPermutation([1,2,5,4,3]);
