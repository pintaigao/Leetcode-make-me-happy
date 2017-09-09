public class Solution {
    public int findCircleNum(int[][] M) {
        //DFS Solution 
        boolean[] visited = new boolean[M.length];
        int count = 0;
        for(int i = 0; i < M.length; i++) 
            if(!visited[i]) {
                dfs(M, visited, i);
                count++;
            }
        return count;
    }
    private void dfs(int[][] M, boolean[] visited, int i) {
        for(int j = 0; j < M.length; j++) 
            if(M[i][j] == 1 && !visited[j]) {
                visited[j] = true;
                dfs(M, visited, j);
            }
    }
}