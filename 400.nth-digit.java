class Solution {
    public int findNthDigit(int n) {
        int len = 1, base = 1;
        for (; n > 9L * base * len; base *= 10) {
            n -= 9 * base * len;
            len++;
        }
        int ans = 0, num = (n - 1) / len + base;
        for (int i = (n - 1) % len; i < len; ++i) {
            ans = num % 10;
            num /= 10;
        }
        return ans;
    }
}