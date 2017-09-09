class Solution {
	public int findPaths(int m, int n, int N, int i, int j) {
		int[][][] mat = new int[m][n][N + 1];
		int count = dfs(mat, i, j, N) % 1000000007;
		return count;
	}

	private final static int[][] dirs = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };

	private int dfs(int[][][] mat, int x, int y, int step) {
		if (x < 0 || y < 0 || x >= mat.length || y >= mat[0].length)
			return 1;
		if (x - step >= 0 && x + step < mat.length && y - step >= 0 && y + step < mat[0].length)
			return 0;
		if (step <= 0)
			return 0;
		if (mat[x][y][step] > 0)
			return mat[x][y][step];
		int count = 0;
		for (int[] dir : dirs) {
			int i = x + dir[0];
			int j = y + dir[1];
			count += dfs(mat, i, j, step - 1);
			count %= 1000000007;
		}
		mat[x][y][step] = count;
		return count;
	}
}
