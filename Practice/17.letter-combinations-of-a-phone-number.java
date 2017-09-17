import java.util.*;

public class Solution {

    private final String[] charmap = { "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz" };

    public List<String> letterCombinations(String digits) {
        LinkedList<String> res = new LinkedList<String>();
        if (digits.length() == 0 || digits == null) {
            return res;
        }
        res.add("");
        for (int i = 0; i < digits.length(); i++) {
            String string = charmap[digits.charAt(i) - '0'];
            while (res.peek().length() == i) {
                String s = res.remove();
                for (char c : string.toCharArray()) {
                    res.add(s + c);
                }

            }
        }
        return res;
    }
}