import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> list = new ArrayList<>();
        int n = nums.length;
        for (int i = 0, j = 1; j <= n; j++) {
            if (j == n || nums[j] > nums[j - 1] + 1) {
                list.add(Integer.toString(nums[i]) + (i == j - 1 ? "" : "->" + Integer.toString(nums[j - 1])));
                i = j;
            }
        }
        return list;
    }
}