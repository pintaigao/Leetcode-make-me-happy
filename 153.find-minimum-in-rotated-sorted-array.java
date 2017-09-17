public class Solution {
    public int findMin(int[] nums) {
        if (nums==null || nums.length==0) { return Integer.MIN_VALUE; } 
        int left = 0, right = nums.length-1;
        while (left < right-1) {  // while (left < right-1) is a useful technique
            int mid = left + (right-left)/2;
            if (nums[mid] > nums[right]) { left = mid; }
            else { right = mid; }
        }
        if (nums[left] > nums[right]) { return nums[right]; }
        return nums[left];
    }
}
