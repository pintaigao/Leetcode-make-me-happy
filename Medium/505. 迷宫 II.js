/**
 * @param {number[][]} maze
 * @param {number[]} start
 * @param {number[]} destination
 * @return {number}
 */
// 2. BFS
var shortestDistance = function (maze, ball, hole) {
  // 方向数组，方便上下左右移动
  // BFS 算法的队列
  // memo 数组记录到达每个墙边位置的最短距离
  // memo 数组类似标准 BFS 算法的 visited 数组
  // 用来判断一个节点是否需要入队继续进行穷举
  let m = maze.length, n = maze[0].length, dirMap = [[0, 1], [0, -1], [1, 0], [-1, 0]], q = [{ ball, dist: 0 }], memo = Array.from({ length: m }, () => Array(n).fill(null))
  memo[ball[0]][ball[1]] = 0;

  // 启动 BFS 算法框架
  while (q.length > 0) {
    const cur = q.shift();

    // 向四个方向扩展
    for (const [nx, ny] of dirMap) {
      // 从该点出发（原始x, y）一直走到墙，而不是只走一步，同时要记录走过的步数
      let x = cur.ball[0], y = cur.ball[1], step = cur.dist, nextX = x + nx, nextY = y + ny;
      while (nextX >= 0 && nextX < m && nextY >= 0 && nextY < n && maze[nextX][nextY] === 0) {
        // 如果符合上面的条件，下一个的坐标
        x = nextX; y = nextY; step++;
        // 下一个将要到达的坐标
        nextX += nx;
        nextY += ny;
      }

      // 如果没有来过，或者拥有更少的步数，都需要重新入队穷举
      // 因为以该节点为起点可达的其他节点都可能拥有更短的路径了
      // 而且现在的 x，y 还是符合范围内的
      if (x === hole[0] && y === hole[1]) {
        // 如果没有来过，或者拥有更少的步数，或者步数相同时拥有更小的字典序，都需要更新到 memo
        if (memo[x][y] === null || memo[x][y] > step) {
          memo[hole[0]][hole[1]] = step;
        }
      } else if (memo[x][y] === null || memo[x][y] > step) {
        // dist： 想象成 dist 的接力
        const p = { ball: [x, y], dist: step };
        memo[x][y] = step;
        q.push(p);
      }
    }
  }

  // 当队列为空时，说明所有可达的节点的最短路径都已经计算出来
  return memo[hole[0]][hole[1]] === null ? -1 : memo[hole[0]][hole[1]];
};