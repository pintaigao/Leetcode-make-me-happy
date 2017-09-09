

public class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> result = new ArrayList<>();
        if (s.length() <= 3) {
            return result;
        }
        if(s.length() >= 13){
            return result;
        }

        for (int i = 1; i < 4 && i < s.length()-2; i++) {
            for (int j = i + 1; j < i + 4 && j < s.length() - 1; j++) {
                for (int k = j + 1; k < j + 4 && k < s.length(); k++) {
                    String n1 = s.substring(0, i), n2 = s.substring(i, j), n3 = s.substring(j, k),
                            n4 = s.substring(k, s.length());
                    if (isValid(n1) && isValid(n2) && isValid(n3) && isValid(n4)) {
                        result.add(n1 + "." + n2 + "." + n3 + "." + n4 );
                    }
                }
            }
        }
        return result;
    }

    public boolean isValid(String string){
        if(string.length() == 0||string.length() > 3 || (string.charAt(0) == '0' && string.length() > 1)|| Integer.parseInt(string) > 255 ){
            return false;
        }
        return true;
    }
}