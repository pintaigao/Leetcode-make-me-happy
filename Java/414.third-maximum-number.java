import java.util.*;

public class Solution {
    public int thirdMax(int[] nums) {
        long max = Long.MIN_VALUE, mid = max, min = max;

        for (int ele : nums) {
            if (ele > max) {
                min = mid;
                mid = max;
                max = ele;
            } else if (max > ele && ele > mid) {
                min = mid;
                mid = ele;
            } else if (mid > ele && ele > min) {
                min = ele;
            }
        }

        return (int) (min != Long.MIN_VALUE ? min : max);
    }
}
