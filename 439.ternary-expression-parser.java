/*
 * @lc app=leetcode id=439 lang=java
 *
 * [439] Ternary Expression Parser
 */
class Solution {
    public String parseTernary(String expression) {
        return String.valueOf(parse(expression));
    }

    private int p = 0;

    private char parse(String s) {
        char first = s.charAt(p);

        p += 2;
        char second = s.charAt(p);
        if (p + 1 < s.length() && s.charAt(p + 1) == '?')
            second = parse(s);

        p += 2;
        char third = s.charAt(p);
        if (p + 1 < s.length() && s.charAt(p + 1) == '?')
            third = parse(s);

        return first == 'T' ? second : third;
    }
}
