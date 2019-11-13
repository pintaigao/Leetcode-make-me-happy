/*
 * @lc app=leetcode id=985 lang=java
 *
 * [985] Sum of Even Numbers After Queries
 */
class Solution {
    public int[] sumEvenAfterQueries(int[] A, int[][] queries) {
        int sum = 0;
        int[] result = new int[queries.length];
        for (int i = 0; i < A.length; i++) {
            sum += (((A[i] + 1) & 1) * A[i]);
        }
        for (int i = 0; i < queries.length; i++) {
            sum -= (((A[queries[i][1]] + 1) & 1) * A[queries[i][1]]);
            A[queries[i][1]] = (A[queries[i][1]] + queries[i][0]);
            sum += (((A[queries[i][1]] + 1) & 1) * A[queries[i][1]]);
            result[i] = sum;
        }
        return result;
    }
}
