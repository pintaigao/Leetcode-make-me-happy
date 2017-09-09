public class Solution {
    public int findMaxLength(int[] nums) {
        Map<Integer, Integer> map = new HashMap<Integer, Integer>() {
            {
                put(0, 0);
            }
        };
        int maxLength = 0, runningSum = 0;
        for (int i = 0; i < nums.length; i++) {
            runningSum += nums[i];
            Integer prev = map.get(2 * runningSum - i - 1);
            if (prev != null)
                maxLength = Math.max(maxLength, i + 1 - prev);
            else
                map.put(2 * runningSum - i - 1, i + 1);
        }
        return maxLength;
    }
}