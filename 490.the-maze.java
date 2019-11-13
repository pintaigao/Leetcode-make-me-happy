/*
 * @lc app=leetcode id=490 lang=java
 *
 * [490] The Maze
 */
class Solution {
    int[][] tarr = { { -1, 0 }, { 0, -1 }, { 1, 0 }, { 0, 1 } };

    public boolean hasPath(int[][] maze, int[] start, int[] destination) {
        boolean[][] visited = new boolean[maze.length][maze[0].length];
        return dfs(maze, start[0], start[1], destination, visited);
    }

    public boolean dfs(int[][] maze, int r, int c, int[] destination, boolean[][] visited) {
        if (r == destination[0] && c == destination[1]) {
            return true;
        }
        visited[r][c] = true;
        for (int i = 0; i < 4; i++) {
            int r1 = r + tarr[i][0];
            int c1 = c + tarr[i][1];
            while (r1 >= 0 && r1 < maze.length && c1 >= 0 && c1 < maze[0].length && maze[r1][c1] == 0) {
                r1 += tarr[i][0];
                c1 += tarr[i][1];
            }
            r1 -= tarr[i][0];
            c1 -= tarr[i][1];
            if (!visited[r1][c1]) {
                if (dfs(maze, r1, c1, destination, visited)) {
                    return true;
                }
            }
        }
        return false;
    }
}
