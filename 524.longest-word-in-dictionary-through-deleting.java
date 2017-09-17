class Solution {
public String findLongestWord(String s, List<String> d) {
String longest = "";
for (String word : d)
if (isBetter(word, longest) && isSubsequence(word, s))
longest = word;
return longest;
}
private boolean isBetter(String a, String b) {
return a.length() > b.length() ||
a.length() == b.length() && a.compareTo(b) < 0;
}

private boolean isSubsequence(String a, String b) {
int start = -1;
for (int i = 0; i < a.length(); i++){
start = b.indexOf(a.charAt(i), start + 1);
if (start < 0)
return false;
}
return true;
}
}