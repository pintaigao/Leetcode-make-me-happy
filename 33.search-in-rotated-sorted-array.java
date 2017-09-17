public class Solution {
    public int search(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;

        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target)
                return mid;
            if (nums[lo] <= target && target < nums[mid]
                    || (nums[mid] < nums[hi] && (target > nums[hi] || target < nums[mid]))) {
                hi = mid - 1;
            } else {
                lo = mid + 1;
            }
        }

        return -1;
    }
}