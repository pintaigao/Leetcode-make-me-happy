class Solution {
    public int superPow(int a, int[] b) {
        int result = 0;
        for (int i = 0; i < b.length; i++) {
            result = result * 10 + b[i];
        }
        if (a >= 1337) {
            while (a % 1337 > 1337)
                a = a % 1337;
        }

        return ((int) Math.pow(a, result)) % 1337;
    }
}