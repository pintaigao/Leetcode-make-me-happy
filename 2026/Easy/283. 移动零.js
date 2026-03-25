/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  // 去除 nums 中的所有 0
  // 返回去除 0 之后的数组长度
  var p = removeElement(nums, 0);
  // 将 p 之后的所有元素赋值为 0
  for (let i = p; i < nums.length; i++) {
    nums[i] = 0;
  }

  // 双指针技巧，复用 [27. 移除元素] 的解法。
  function removeElement(nums, val) {
    let fast = 0, slow = 0;
    while (fast < nums.length) {
      if (nums[fast] !== val) {
        nums[slow] = nums[fast];
        slow++;
      }
      fast++;
    }
    return slow;
  }
};

// 练习,请用中英语阐述，就当我是求职者，你是面试官，我要让你明白这个怎么解，我不可能一下子就写出基本骨架，一步一步来
// 暴力
let moveZeroes2 = function (nums) {
  let res = [];
  let pointer = 0;
  while (pointer < nums.length) {
    if (nums[pointer] !== 0) {
      res.push(nums[pointer]);
    }
    pointer++;
  }
  while (res.length < nums.length) {
    res.push(0);
  }
  for (let i = 0; i < nums.length; i++) {
    nums[i] = res[i];
  }
}

// 双指针
let moveZeroes3 = function (nums) {
  // I need to move all the 0s to the end of the array while maintaining the relative order of the non-zero elements. I can use two pointers, one for iterating through the array and another for keeping track of the position to place the next non-zero element.
  // 我需要将所有的 0 移动到数组的末尾，同时保持非零元素的相对顺序。我可以使用两个指针，一个用于遍历数组，另一个用于跟踪放置下一个非零元素的位置。
  // I will initialize both pointers at the beginning of the array. The fast pointer will iterate through the array, and whenever it encounters a non-zero element, I will copy it to the position indicated by the slow pointer and then increment the slow pointer. After the fast pointer has gone through the entire array, all non-zero elements will be moved to the front, and I can fill the rest of the array with 0s.
  // 我将初始化两个指针都在数组的开头。快指针将遍历数组，每当它遇到一个非零元素时，我将把它复制到慢指针指示的位置，然后递增慢指针。当快指针遍历完整个数组后，所有非零元素将被移动到前面，我可以用 0 填充数组的其余部分。
  let slow = 0, fast = 0;

  // The fast pointer will go through each element in the array. If it finds a non-zero element, it will copy it to the position of the slow pointer and then move the slow pointer forward. This way, all non-zero elements are moved to the front of the array in their original order.
  // 快指针将遍历数组中的每个元素。如果它找到一个非零元素，它将把它复制到慢指针的位置，然后将慢指针向前移动。这样，所有非零元素都被移动到数组的前面，并保持原来的顺序。
  while (fast < nums.length) {
    // If the current element is not zero, copy it to the position of the slow pointer and move the slow pointer forward.
    // 如果当前元素不是零，将其复制到慢指针的位置，并将慢指针向前移动。
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast];
      slow++;
    }

    // Move the fast pointer to the next element in the array.
    // 将快指针移动到数组的下一个元素。
    fast++;
  }

  // After the fast pointer has gone through the entire array, all non-zero elements are now at the front of the array. The slow pointer indicates the position where the next non-zero element would have been placed, which means that from the slow pointer to the end of the array, we need to fill it with 0s.
  // 当快指针遍历完整个数组后，所有非零元素现在都在数组的前面。慢指针指示下一个非零元素将被放置的位置，这意味着从慢指针到数组的末尾，我们需要用 0 填充。
  // Fill the rest of the array with 0s starting from the position of the slow pointer to the end of the array.
  // 从慢指针的位置开始到数组的末尾，用 0 填充数组的其余部分。 
  while (slow < nums.length) {
    nums[slow] = 0;
    slow++;
  }
}

// 单指针
var moveZeroes = function (nums) {
  let lastNonZeroFoundAt = 0;
  // If the current element is not 0, then we need to
  // append it just in front of last non 0 element we found.
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) {
      nums[lastNonZeroFoundAt] = nums[i];
      lastNonZeroFoundAt += 1;
    }
  }
  // After we have finished processing new elements,
  // all the non-zero elements are already at beginning of array.
  // We just need to fill remaining array with 0's.
  for (let i = lastNonZeroFoundAt; i < nums.length; i++) {
    nums[i] = 0;
  }
};

