public class Solution {
    public int findPairs(int[] nums, int k) {
        if (nums == null || nums.length < 2) return 0;
        int len = nums.length, count = 0;
        int start = 0, end = 1, last = 0;
        Arrays.sort(nums);
        while (end < len && start < len) {
            if (nums[start] + k == nums[end]) {
                count++;
                start++;
                end++;
                while (start < len  && nums[start] == nums[start-1]) {
                    start++;
                }
                if (start == end) end++;
            } else if (nums[start] + k > nums[end]) {
                end++;
            } else {
                start++;
                if (start == end) end++;
            }
        }
        
        return count;
    }
}