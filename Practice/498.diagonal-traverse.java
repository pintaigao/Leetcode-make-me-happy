class Solution {
    public int[] findDiagonalOrder(int[][] matrix) {
        if (matrix == null || matrix.length == 0)
            return new int[0];
        int rowlength = matrix.length, columlength = matrix[0].length;
        int[] result = new int[rowlength * columlength];
        int rowindex = 0, columindex = 0, dirindex = 0;
        int[][] dir = { { -1, 1 }, { 1, -1 } };
        for (int i = 0; i < rowindex * columindex; i++) {
            result[i] = matrix[rowindex][columindex];
            rowindex += dir[dirindex][0];
            columindex += dir[dirindex][1];

            if (rowindex < 0) {
                rowindex = 0;
                dirindex = 1 - dirindex;
            }

            if (rowindex >= rowlength) {
                rowindex -= 1;
                columindex += 2;
                dirindex = 1 - dirindex;
            }

            if (columindex < 0) {
                columindex = 0;
                dirindex = 1 - dirindex;
            }

            if (columindex >= columlength) {
                columindex -= 1;
                rowindex += 2;
                dirindex = 1 - dirindex;
            }
        }
        return result;
    }
}