// Dijkstra
var findShortestWay = function (maze, ball, hole) {
  const m = maze.length, n = maze[0].length, dirs = [[1, 0, "d"], [0, -1, "l"], [0, 1, "r"], [-1, 0, "u"]], dist = Array.from({ length: m }, () => Array(n).fill(Infinity)), bestPath = Array.from({ length: m }, () => Array(n).fill(null));

  const pq = new PriorityQueue((a, b) => {
    if (a.dist !== b.dist) {
      return a.dist - b.dist;
    }
    return a.path.localeCompare(b.path);
  });

  dist[ball[0]][ball[1]] = 0;
  bestPath[ball[0]][ball[1]] = "";

  pq.enqueue({ row: ball[0], col: ball[1], dist: 0, path: "" });

  while (!pq.isEmpty()) {
    const cur = pq.dequeue(), row = cur.row, col = cur.col, curDist = cur.dist, curPath = cur.path;

    if (row === hole[0] && col === hole[1]) { return curPath; }

    if (curDist > dist[row][col] || (curDist === dist[row][col] && curPath > bestPath[row][col])) {
      continue;
    }

    for (const [dr, dc, direction] of dirs) {
      let r = row, c = col, steps = 0;

      while (r + dr >= 0 && r + dr < m && c + dc >= 0 && c + dc < n && maze[r + dr][c + dc] === 0) {
        r += dr; c += dc; steps++;

        if (r === hole[0] && c === hole[1]) {
          break;
        }
      }

      const nextDist = curDist + steps, nextPath = curPath + direction;

      if (nextDist < dist[r][c] || (nextDist === dist[r][c] && (bestPath[r][c] === null || nextPath < bestPath[r][c]))) {
        dist[r][c] = nextDist;
        bestPath[r][c] = nextPath;

        pq.enqueue({ row: r, col: c, dist: nextDist, path: nextPath });
      }
    }
  }

  return "impossible";
};

// 2. BFS
var findShortestWay = function (maze, ball, hole) {
  // 方向数组，方便上下左右移动
  // BFS 算法的队列
  // memo 数组记录到达每个墙边位置的最短距离
  // memo 数组类似标准 BFS 算法的 visited 数组
  // 用来判断一个节点是否需要入队继续进行穷举
  let m = maze.length, n = maze[0].length, dirMap = [[0, 1, "r"], [0, -1, "l"], [1, 0, "d"], [-1, 0, "u"]], q = [], memo = Array.from({ length: m }, () => Array(n).fill(null)), start = { ball, dist: 0, path: '' };
  // 加入起点
  q.push(start);
  memo[ball[0]][ball[1]] = start;

  // 启动 BFS 算法框架
  while (q.length > 0) {
    const cur = q.shift();

    // 向四个方向扩展
    for (const [nx, ny, dirKey] of dirMap) {
      // 从该点出发（原始x, y）一直走到墙，而不是只走一步，同时要记录走过的步数
      let x = cur.ball[0], y = cur.ball[1], step = cur.dist, nextX = x + nx, nextY = y + ny;
      while (nextX >= 0 && nextX < m && nextY >= 0 && nextY < n && maze[nextX][nextY] === 0) {
        // 如果符合上面的条件，下一个的坐标
        x = nextX; y = nextY; step++;
        // 在到达墙边停下之前可能就会掉到洞里，所以要更新到 memo
        if (x === hole[0] && y === hole[1]) {
          // 如果没有来过，或者拥有更少的步数，或者步数相同时拥有更小的字典序，都需要更新到 memo
          if (memo[x][y] === null || memo[x][y].dist > step || (memo[x][y].dist === step && memo[x][y].path.localeCompare(cur.path + dirKey) > 0)) {
            memo[hole[0]][hole[1]] = { ball: [x, y], dist: step, path: cur.path + dirKey };
          }
        }

        // 下一个将要到达的坐标
        nextX += nx;
        nextY += ny;
      }
      // 如果没有来过，或者拥有更少的步数，都需要重新入队穷举
      // 因为以该节点为起点可达的其他节点都可能拥有更短的路径了
      // 而且现在的 x，y 还是符合范围内的
      if (memo[x][y] === null || memo[x][y].dist > step || (memo[x][y].dist === step && memo[x][y].path.localeCompare(cur.path + dirKey) > 0)) {
        const p = { ball: [x, y], dist: step, path: cur.path + dirKey };
        memo[x][y] = p;
        q.push(p);
      }
    }
  }

  // 当队列为空时，说明所有可达的节点的最短路径都已经计算出来
  if (memo[hole[0]][hole[1]] === null) {
    return "impossible";
  }
  return memo[hole[0]][hole[1]].path;
};