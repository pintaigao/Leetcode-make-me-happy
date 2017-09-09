public class Solution {
    public int[] nextGreaterElements(int[] nums) {
        int[] r = new int[nums.length];
        if (nums.length == 0)
            return r;
        Arrays.fill(r, -1);
        int[] N = new int[nums.length];
        int[] P = new int[nums.length];
        N[0] = nums[0];
        P[0] = 0;
        int p = 0, l = 2 * r.length;
        for (int i = 1; i < l - 1; ++i) {
            int ri = i % r.length;
            if (nums[ri] <= N[p]) {
                if (++p >= r.length)
                    break;
                N[p] = nums[ri];
                P[p] = ri;
            } else {
                while (p >= 0 && N[p] < nums[ri]) {
                    r[P[p]] = nums[ri];
                    --p;
                }
                N[++p] = nums[ri];
                P[p] = ri;
            }
        }
        return r;
    }
}