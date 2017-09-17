import java.util.HashMap;
import java.util.Map;

class Solution {
    public String[] findRelativeRanks(int[] nums) {
        Map<Integer, Integer> map = new HashMap<>();
        String[] result = new String[nums.length];
        int[] record = nums.clone();
        Arrays.sort(record);
        for (int i = 0; i < record.length; i++) {
            map.put(record[i], record.length - i);
        }
        for (int i = 0; i < nums.length; i++) {
            if (map.get(nums[i]) == 1) {
                result[i] = "Gold Medal";
            } else if (map.get(nums[i])== 2) {
                result[i] = "Silver Medal";
            } else if (map.get(nums[i])== 3) {
                result[i] = "Bronze Medal";
            } else {
                result[i] = map.get(nums[i])+"";
            }

        }
        return result;
    }
}