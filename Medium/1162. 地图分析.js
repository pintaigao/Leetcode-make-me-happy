/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function (grid) {
  let rows = grid.length, cols = grid[0].length, queue = [], head = 0, dist = Array.from({ length: rows }, () => Array(cols).fill(-1)), directions = [[1, 0], [-1, 0], [0, 1], [0, -1]], maxDistance = 0;

  // Step 1:
  // 所有陆地同时作为 BFS 起点，距离都是 0
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        queue.push([row, col]);
        dist[row][col] = 0;
      }
    }
  }

  // 全是海洋，或者全是陆地
  if (queue.length === 0 || queue.length === rows * cols) { return -1; }
  // Step 2:
  // 从所有陆地同时向外扩散
  while (head < queue.length) {
    const [row, col] = queue[head];

    for (const [dr, dc] of directions) {
      const nextRow = row + dr, nextCol = col + dc;

      if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) { continue; }

      // dist !== -1 表示已经访问过
      if (dist[nextRow][nextCol] !== -1) { continue; }

      dist[nextRow][nextCol] = dist[row][col] + 1;

      maxDistance = Math.max(maxDistance, dist[nextRow][nextCol]);

      queue.push([nextRow, nextCol]);
    }

    head += 1;
  }

  return maxDistance;
};

// Size 分层 BFS
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function (grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const queue = [];
  let head = 0;

  // 所有陆地作为起点
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        queue.push([row, col]);
      }
    }
  }

  if (queue.length === 0 || queue.length === rows * cols) {
    return -1;
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  let distance = -1;

  while (head < queue.length) {
    const size = queue.length - head;

    distance++;

    for (let i = 0; i < size; i++) {
      const [row, col] = queue[head++];

      for (const [dr, dc] of directions) {
        const nextRow = row + dr;
        const nextCol = col + dc;

        if (
          nextRow < 0 ||
          nextRow >= rows ||
          nextCol < 0 ||
          nextCol >= cols
        ) {
          continue;
        }

        // 只扩散到还没有访问过的海洋
        if (grid[nextRow][nextCol] !== 0) {
          continue;
        }

        // 将海洋改成陆地，相当于 visited
        grid[nextRow][nextCol] = 1;
        queue.push([nextRow, nextCol]);
      }
    }
  }

  return distance;
};