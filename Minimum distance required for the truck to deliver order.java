import java.util.LinkedList;
import java.util.Queue;

class Solution {
    
  class Point{
      int x;
      int y;
      int len;
      public Point(int x, int y, int len) {
          this.x = x;
          this.y = y;
          this.len = len;
      }
  }
  
  public int shortestDistance(int[][] maze, int[] start, int[] destination) {
      int m = maze.length;
      int n = maze[0].length;
      int [][] distance = new int [m][n];
      for (int i = 0; i < m; ++i) {
          for (int j = 0; j < n; ++j) {
              distance[i][j] = Integer.MAX_VALUE;
          }
      }
      int [][] dir = {{1,0},{-1,0},{0,1},{0,-1}};
      
      Queue<Point> q = new LinkedList<>();
      q.offer(new Point(start[0], start[1], 0));
      
      while(!q.isEmpty()) {
          Point p = q.poll();
          if(p.len >= distance[p.x][p.y]) {
              continue;
          }
          distance[p.x][p.y] = p.len;
          for(int i=0; i<4; i++) {
              int xx = p.x;
              int yy = p.y;
              int len = p.len;
              while(xx >=0 && xx < m && yy >= 0 && yy < n && maze[xx][yy] != 1) {
                  xx += dir[i][0];
                  yy += dir[i][1];
                  len++;
              }
              xx -= dir[i][0];
              yy -= dir[i][1];
              len--;
              q.offer(new Point(xx, yy, len));
          }
      }
      return distance[destination[0]][destination[1]] == Integer.MAX_VALUE? -1 : distance[destination[0]][destination[1]];
  }
}