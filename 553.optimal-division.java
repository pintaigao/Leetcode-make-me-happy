public class Solution {
    class Result {
        String str;
        double val;
    }

    public String optimalDivision(int[] nums) {
        int len = nums.length;
        return getMax(nums, 0, len - 1).str;
    }

    private Result getMax(int[] nums, int start, int end) {
        Result r = new Result();
        r.val = -1.0;

        if (start == end) {
            r.str = nums[start] + "";
            r.val = (double) nums[start];
        } else if (start + 1 == end) {
            r.str = nums[start] + "/" + nums[end];
            r.val = (double) nums[start] / (double) nums[end];
        } else {
            for (int i = start; i < end; i++) {
                Result r1 = getMax(nums, start, i);
                Result r2 = getMin(nums, i + 1, end);
                if (r1.val / r2.val > r.val) {
                    r.str = r1.str + "/" + (end - i >= 2 ? "(" + r2.str + ")" : r2.str);
                    r.val = r1.val / r2.val;
                }
            }
        }

        //System.out.println("getMax " + start + " " + end + "->" + r.str + ":" + r.val);
        return r;
    }

    private Result getMin(int[] nums, int start, int end) {
        Result r = new Result();
        r.val = Double.MAX_VALUE;

        if (start == end) {
            r.str = nums[start] + "";
            r.val = (double) nums[start];
        } else if (start + 1 == end) {
            r.str = nums[start] + "/" + nums[end];
            r.val = (double) nums[start] / (double) nums[end];
        } else {
            for (int i = start; i < end; i++) {
                Result r1 = getMin(nums, start, i);
                Result r2 = getMax(nums, i + 1, end);
                if (r1.val / r2.val < r.val) {
                    r.str = r1.str + "/" + (end - i >= 2 ? "(" + r2.str + ")" : r2.str);
                    r.val = r1.val / r2.val;
                }
            }
        }

        //System.out.println("getMin " + start + " " + end + "->" + r.str + ":" + r.val);
        return r;
    }
}