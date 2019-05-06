class Solution {
    public String addStrings(String num1, String num2) {
        long result = 0;
        long first = turnIntoRealNumber(num1);
        long second = turnIntoRealNumber(num2);
        result = first + second;
        return first + second + "";
    };

    public long turnIntoRealNumber(String num) {
        long result = 0;
        char[] charArr = num.toCharArray();
        for(int i = 0; i< num.toCharArray().length; i++ ){
            result = result * 10 + charArr[i] - '0';
        }
        return result;
    };

    public static void main(String[] args) {
        Solution s = new Solution();
        s.addStrings("3876620623801494171", "6529364523802684779");
    }

}