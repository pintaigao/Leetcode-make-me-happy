import java.util.Arrays;

public class kthSmallet {
    public int kthSmallest(int[][] matrix, int k) {
        int[] res = new int[matrix[0].length * matrix.length];
        int start = 0;
        while (start < matrix[0].length * matrix.length) {
            for (int[] i : matrix) {
                for (int i1 : i) {
                    res[start] = i1;
                    start++;
                }
            }
        }
        Arrays.sort(res);
        return res[k-1];
    }
    public static void main(String[] args) {
        int[][] matrix = {{1,2},{1,3}};
        kthSmallet kS = new kthSmallet();
        int res = kS.kthSmallest(matrix, 2);
        System.out.print(res);
    }
}
