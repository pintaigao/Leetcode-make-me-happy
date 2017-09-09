
class Solution {
    public String findLongestWord(String s, List<String> d) {
        String res = "";
        for (String string : d) {
            if (helper(s, string)) {
                if (string.length() > res.length()) {
                    res = string;
                } else if (res.length() == string.length() && string.compareTo(res) < 0) {
                    res = string;
                }
            }
        }
        return res;
    }

    public boolean helper(String origin, String s) {
        char[] o1 = origin.toCharArray(), o2 = s.toCharArray();
        int i = 0, j = 0;
        while (i < origin.length() && j < s.length()) {
            if (o1[i] == o2[j]) {
                j++;
            }
            i++;
        }
        return j == o2.length;
    }
}