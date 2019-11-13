/*
 * @lc app=leetcode id=905 lang=java
 *
 * [905] Sort Array By Parity
 */
class Solution {
    public int[] sortArrayByParity(int[] a) {
        int[] b = new int[a.length];
        int even = 0;
        int odd = a.length - 1;
        for (int i = 0; i < a.length; i++) {
            if (a[i] % 2 == 0)
                b[even++] = a[i];
            else
                b[odd--] = a[i];
        }
        return b;
    }
}
