import java.util.HashMap;
import java.util.Map;

public class Solution {
    int singleNumber(int A[]) {
        int n = A.length;
        int result = 0;
        for (int i = 0; i < n; i++) {
            result ^= A[i];
        }
        return result;
    }
}