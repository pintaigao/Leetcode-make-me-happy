import java.util.ArrayList;
import java.util.List;

public class Solution {

    public String[] findWords(String[] words) {
        List<String> result = new ArrayList<>();
        String firstRow = "qwertyuiop", secondRow = "asdfghjkl", thirdRow = "zxcvbnm";
        char[] map = new char[26];
        for (int i = 0; i < firstRow.length(); i++) {
            map[firstRow.charAt(i) - 'a'] = '1';
        }
        for (int i = 0; i < secondRow.length(); i++) {
            map[secondRow.charAt(i) - 'a'] = '2';
        }
        for (int i = 0; i < thirdRow.length(); i++) {
            map[thirdRow.charAt(i) - 'a'] = '3';
        }

        for (String string : words) {
            boolean addOrNot = true;
            char group = map[Character.toLowerCase(string.charAt(0)) - 'a'];
            for (int i = 1; i < string.length(); i++) {
                if (map[Character.toLowerCase(string.charAt(i)) - 'a'] != group) {
                    addOrNot = false;
                    break;
                }
            }
            if (addOrNot == true) {
                result.add(string);
            }
        }

        return result.toArray(new String[0]);
    }
}