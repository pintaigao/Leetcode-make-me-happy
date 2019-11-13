/*
 * @lc app=leetcode id=215 lang=javascript
 *
 * [215] Kth Largest Element in an Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {

    function swap(nums, i, j) {
        let temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    function quickSelect(nums, k, startIndex, endIndex) {
        let pivot = startIndex;
        for (let j = startIndex; j < endIndex; j++) {
            if (nums[j] <= nums[endIndex]) {
                swap(nums, pivot++, j)
            }
        }
        swap(nums, pivot, endIndex);
        // count the nums that are > pivot from high
        let count = endIndex - pivot + 1;
        // pivot is the one!
        if (count == k) return nums[pivot];
        // pivot is too small, so it must be on the right
        if (count > k) return quickSelect(nums, k, pivot + 1, endIndex)
        else {
            // pivot is too big, so it must be on the left
            return quickSelect(nums, k - count, startIndex, pivot - 1);
        };
    };

    return quickSelect(nums, k, 0, nums.length - 1);
};
// @lc code=end