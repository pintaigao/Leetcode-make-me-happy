public class Solution {
    private char[] map = new char[256];
    {
        for (int i = 0; i < 10; i++) {
            map[i + '0'] = (char) (i+1);
        }
        for (int i = 0; i < 26; i++) {
            map[i + 'a'] = map[i + 'A'] = (char) (i+12);
        }
    }

    public boolean isPalindrome(String s) {
        char[] charmap = s.toCharArray();
        int start = 0, end = charmap.length - 1;
        char cs, ce;
        while (start < end) {
            cs = map[charmap[start]];
            ce = map[charmap[end]];
            if (cs != 0 && ce != 0) {
                if (cs != ce) {
                    return false;
                }
                start++;
                end--;
            } else {
                if (cs == 0) {
                    start++;
                } else if (ce == 0) {
                    end--;
                }
            }
        }
        return true;

    }
}