import java.util.List;

/*
 * @lc app=leetcode id=986 lang=java
 *
 * [986] Interval List Intersections
 */
class Solution {
    public int[][] intervalIntersection(int[][] A, int[][] B) {
        List<int[]> res = new ArrayList();
        int i = 0, j = 0;
        while (i < A.length && j < B.length) {
            int low = Math.max(A[i][0], B[j][0]);
            int high = Math.min(A[i][1], B[j][1]);
            if (low <= high)
                res.add(new int[] { low, high });
            if (A[i][1] < B[j][1])
                i++;
            else
                j++;

        }

        int[][] result = res.toArray(new int[0][]);

        return result;
    }
}
