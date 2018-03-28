class Solution {
        public int monotoneIncreasingDigits(int N) {
        char[] digit = (N + "").toCharArray();
        int flag = digit.length;
        for (int i = digit.length - 1; i > 0; i--) {
            if (digit[i] < digit[i - 1]) {
                digit[i - 1]--;
                flag = i;
            }
        }
        Arrays.fill(digit, flag, digit.length, '9');
        return Integer.parseInt(new String(digit));
    }
}