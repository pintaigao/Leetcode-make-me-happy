public class Solution {
	public void gameOfLife(int[][] board) {
	for (int r = 0; r < board.length; r++) {
		for (int c = 0; c <board[r].length; c++) {
			int count = countNeighbors(board, r, c);
			if (count == 3 || (count == 2 && board[r][c] == 1))
				board[r][c] += 10;
			}
		}
		flashBoard(board);
	}
	int countNeighbors(int[][] board, int r, int c) {
		int count = 0;
		for (int row = Math.max(r - 1, 0); row <= Math.min(r + 1, (int)board.length-1); row++) {  //防止它超出边界
			for (int col = Math.max(c - 1, 0); col <= Math.min(c + 1, (int)board[row].length-1); col++) { 
				if (row != r || col != c)
					count += board[row][col] % 10;
				}
		}
		return count;
	}
	void flashBoard(int[][] board) {
		for (int i = 0; i < board.length; i++) {
			for (int j = 0; j < board[i].length; j++) {
				board[i][j] = board[i][j] / 10;
			}
		}
	}
}