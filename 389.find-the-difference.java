class Solution {
    public char findTheDifference(String s, String t) {
        int[] arr = new int[26];
        char result = 'a';
        for (char c : t.toCharArray()) {
            arr[c - 'a']++;
        }
        for (char c : s.toCharArray()) {
            arr[c - 'a']--;
        }
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == 1) {
                result = (char) (i + 'a');
            }
        }
        return result;
    }
}