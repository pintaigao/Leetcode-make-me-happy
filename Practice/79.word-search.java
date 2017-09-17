public class Solution {
    public boolean exist(char[][] board, String word) {
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                if (helper(board, word, i, j, 0))
                    return true;
            }
        }
        return false;
    }

    public boolean helper(char[][] board, String word, int row, int colum, int step) {
        if (step == word.length()) {
            return true;
        }
        if (row < 0 || row >= board.length || colum < 0 || colum >= board[0].length) {
            return false;
        }

        if (board[row][colum] != word.charAt(step)) {
            return false;
        }
        char record = board[row][colum];
        board[row][colum] = '1';
        boolean result = helper(board, word, row + 1, colum, step + 1) || helper(board, word, row - 1, colum, step + 1)
                || helper(board, word, row, colum + 1, step + 1) || helper(board, word, row, colum - 1, step + 1);
        board[row][colum] = record;
        return result;
    }
}