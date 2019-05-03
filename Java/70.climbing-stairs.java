public class Solution {
    private int[] result = new int[1000];
    public int climbStairs(int n) {
        if(n == 1 || n ==2)
            return n;
        result[1] = 1;
        result[2] = 2;
        for(int i = 3;i<=n;i++){
            result[i] = result[i-1] + result[i-2];
        }
        return result[n];
    }
}