public class Solution {
    public int numIslands(char[][] g) {
        if (g.length < 1 || g[0].length < 1) return 0;
        int n = g.length, m = g[0].length, island = 0;
        UnionFindSet uf = new UnionFindSet(n, m);
        
        for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (g[i][j] == '1') {
                uf.find(i, j);
                if (i > 0 && g[i - 1][j] == '1') uf.merge(i - 1, j, i, j);
                if (j > 0 && g[i][j - 1] == '1') uf.merge(i, j - 1, i, j);
            }
        
        for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (g[i][j] == '1' && uf.isSetHead(i, j)) island++;
        
        return island;
    }
    
    private class UnionFindSet { // 2d
        int n, m;
        int[] size, p;
        
        public UnionFindSet(int nn, int mm) {
            n = nn; m = mm;
            size = new int[n * m]; p = new int[n * m];
            Arrays.fill(p, -1);
        }
        
        private int id(int i, int j) {
            return i * m + j;
        }
        
        private int find(int i, int j) {
            return find(id(i, j));
        }
        
        private int find(int x) {
            if (p[x] == -1) {
                size[x] = 1;
                p[x] = x;
                return x;
            }
            p[x]  = (p[x] == x) ? x : find(p[x]);
            return p[x];
        }
        
        private void merge(int i1, int j1, int i2, int j2) {
            int s1 = find(i1, j1), s2 = find(i2, j2);
            if (s1 == s2) return;
            if (size[s1] > size[s2]) {
                p[s2] = s1; size[s1] += size[s2];
            } else {
                p[s1] = s2; size[s2] += size[s1];
            }
        }
        
        private boolean isSetHead(int i, int j) {
            return id(i, j) == find(i, j);
        }
    }
}



