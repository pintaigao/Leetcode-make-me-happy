public class Solution {
    public int countNumbersWithUniqueDigits(int n) {
        return doCount(n, new boolean[10], 0);
    }
    
    private int doCount(int n, boolean[] used, int d) {
        if (d == n) return 1;
        int total = 1;
        for (int i = (d == 0) ? 1 : 0; i <= 9; i++) {
            if (!used[i]) {
                used[i] = true;
                total += doCount(n, used, d + 1);
                used[i] = false;
            }
        }
        return total;
    }
}