public class Solution {
    private static final char[] charMap = new char[256];
    static {
        for (int i = 0; i < 10; i++) {
            charMap[i + '0'] = (char) (1 + i); // numeric
        }
        for (int i = 0; i < 26; i++) {
            charMap[i + 'a'] = charMap[i + 'A'] = (char) (11 + i); //alphabetic, ignore cases
        }
    }

    public boolean isPalindrome(String s) {
        char[] pChars = s.toCharArray();
        int start = 0, end = pChars.length - 1;
        char cS, cE;
        while (start < end) {
            cS = charMap[pChars[start]];
            cE = charMap[pChars[end]];
            if (cS != 0 && cE != 0) {
                if (cS != cE)
                    return false;
                start++;
                end--;
            } else {
                if (cS == 0)
                    start++;
                if (cE == 0)
                    end--;
            }
        }
        return true;
    }
}
