public class Solution {
    public void merge(int A[], int m, int B[], int n) {
        for (int i = m - 1, j = n - 1, k = m + n - 1; j >= 0;)
            A[k--] = i >= 0 && A[i] > B[j] ? A[i--] : B[j--];
    }
}
