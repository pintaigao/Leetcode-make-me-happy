import java.util.ArrayList;

public class Solution {
    List<List<String>> result = new ArrayList<>();
    List<String> temp = new ArrayList<>();

    public List<List<String>> partition(String s) {
        helper(s, 0);
        return result;
    }

    public void helper(String s, int index) {
        if (index == s.length()) {
            result.add(new ArrayList<>(temp));
        } else {
            for (int i = index; i < s.length(); i++) {
                if (isValid(s, index, i)) {
                    temp.add(s.substring(index, i+1));
                    helper(s, i + 1);
                    temp.remove(temp.size() - 1);
                }
            }
        }
    }

    public boolean isValid(String s, int start, int end) {
        while (start < end)
            if (s.charAt(start++) != s.charAt(end--)) {
                return false;
            }
        return true;
    }
}