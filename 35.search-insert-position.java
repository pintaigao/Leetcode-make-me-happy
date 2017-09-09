public class Solution {
    public int searchInsert(int[] nums, int target) {
        if (target <= nums[0]) {
            return 0;
        }
        if (target > nums[nums.length - 1]) {
            return nums.length;
        }
        return search(nums, target, 0, nums.length - 1);
    }

    private int search(int[] nums, int target, int startIndex, int endIndex) {
        if (startIndex == endIndex) {
            return startIndex;
        }
        int middle = (startIndex + endIndex) / 2;
        if (target == nums[middle]) {
            return middle;
        }
        if (target < nums[middle]) {
            return search(nums, target, startIndex, middle);
        }
        return search(nums, target, middle + 1, endIndex);
    }
}
