/*
 * @lc app=leetcode id=490 lang=javascript
 *
 * [490] The Maze
 */
/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {boolean}
 */

// 1. DFS O(mn) O(mn)
var hasPath = function (maze, start, destination) {
  // 生成一个二维数组，用来记录走过的路径
  let visited = new Array(maze.length).fill(false).map(() => Array(maze[0].length).fill(false));

  let dfs = function (start) {
    if (visited[start[0]][start[1]]) return false;
    if (start[0] == destination[0] && start[1] == destination[1]) return true;
    visited[start[0]][start[1]] = true;
    let [r, l, u, d] = [start[1] + 1, start[1] - 1, start[0] - 1, start[0] + 1];
    // 从现在这个点一直到右面
    while (r < maze[0].length && maze[start[0]][r] == 0) r++;
    // 看看是不是终点，如果是，return true，不是，继续从新的点开始dfs
    if (dfs([start[0], r - 1])) return true;
    // 从现在这个点一直到左面
    while (l >= 0 && maze[start[0]][l] == 0) l--;
    // 看看是不是终点，如果是，return true，不是，继续从新的点开始dfs
    if (dfs([start[0], l + 1])) return true;
    // 从现在这个点一直到上面
    while (u >= 0 && maze[u][start[1]] == 0) u--;
    // 看看是不是终点，如果是，return true，不是，继续从新的点开始dfs
    if (dfs([u + 1, start[1]])) return true;
    // 从现在这个点一直到下面
    while (d < maze.length && maze[d][start[1]] == 0) d++;
    // 看看是不是终点，如果是，return true，不是，继续从新的点开始dfs
    if (dfs([d - 1, start[1]])) return true;
    // 如果上面的都没有，返回false
    return false;
  };

  return dfs(start);
};

/* BFS */
let hasPath2 = function (maze, start, destination) {
  let visited = new Array(maze.length).fill(false).map(() => Array(maze[0].length).fill(false));
  let dirs = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];
  let queue = [];
  queue.push(start);
  visited[start[0]][start[1]] = true;
  while (queue.length) {
    let s = queue.shift();
    if (s[0] == destination[0] && s[1] == destination[1]) return true;
    for (let dir of dirs) {
      let x = s[0] + dir[0];
      let y = s[1] + dir[1];
      while (x >= 0 && y >= 0 && x < maze.length && y < maze[0].length && maze[x][y] == 0) {
        // 一直到底
        x += dir[0];
        y += dir[1];
      }
      if (!visited[x - dir[0]][y - dir[1]]) {
        queue.push([x - dir[0], y - dir[1]]);
        visited[x - dir[0]][y - dir[1]] = true;
      }
    }
  }
  return false;
};

hasPath(
  [
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [1, 1, 0, 1, 1],
    [0, 0, 0, 0, 0],
  ],
  [0, 4],
  [3, 2]
);
