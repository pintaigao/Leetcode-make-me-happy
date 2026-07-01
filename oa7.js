function minimumInconvenience(grid) {
  // 8 directions because distance is max(abs(dx), abs(dy))
  const rows = grid.length, cols = grid[0].length, dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity)), queue = [], dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]], hasZero = false, head = 0;

  // Multi-source BFS from all existing delivery centers
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 1) {
        dist[r][c] = 0;
        queue.push([r, c]);
      } else {
        hasZero = true;
      }
    }
  }

  if (!hasZero) return 0;

  while (head < queue.length) {
    const [r, c] = queue[head++];

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

      if (dist[nr][nc] === Infinity) {
        dist[nr][nc] = dist[r][c] + 1;
        queue.push([nr, nc]);
      }
    }
  }

  function can(R) {
    let rowLow = 0;
    let rowHigh = rows - 1;
    let colLow = 0;
    let colHigh = cols - 1;

    let hasBadCell = false;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (dist[r][c] > R) {
          hasBadCell = true;

          rowLow = Math.max(rowLow, r - R);
          rowHigh = Math.min(rowHigh, r + R);

          colLow = Math.max(colLow, c - R);
          colHigh = Math.min(colHigh, c + R);
        }
      }
    }

    // Existing centers already make every place close enough.
    if (!hasBadCell) return true;

    if (rowLow > rowHigh || colLow > colHigh) {
      return false;
    }

    // Need to place the new center on a 0 cell inside the intersection.
    for (let r = rowLow; r <= rowHigh; r++) {
      for (let c = colLow; c <= colHigh; c++) {
        if (grid[r][c] === 0) {
          return true;
        }
      }
    }

    return false;
  }

  let left = 0;
  let right = Math.max(rows, cols);
  let answer = right;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (can(mid)) {
      answer = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return answer;
}

// 暴力的方法：
function minimumInconvenienceBruteForc(grid) {
  let rows = grid.length, cols = grid[0].length, dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]], hasZero = false, answer = Infinity;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0) {
        hasZero = true;
      }
    }
  }

  if (!hasZero) return 0;

  function bfs(extraR, extraC) {
    let dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity)), queue = [], maxDist = 0;

    // 所有原本的 delivery center 都是 BFS 起点
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // 当前枚举的 0 也假装变成 1
        if (grid[r][c] === 1 || (r === extraR && c === extraC)) {
          dist[r][c] = 0;
          queue.push([r, c]);
        }
      }
    }

    while (queue.length > 0) {
      const [r, c] = queue.shift();

      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;

        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;

        if (dist[nr][nc] > dist[r][c] + 1) {
          dist[nr][nc] = dist[r][c] + 1;
          maxDist = Math.max(maxDist, dist[nr][nc]);
          queue.push([nr, nc]);
        }
      }
    }

    console.log(dist);


    return maxDist;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 0) {
        answer = Math.min(answer, bfs(r, c));
      }
    }
  }

  console.log(answer);


  return answer;
}

// minimumInconvenienceBruteForc([[0, 0, 0, 1], [0, 0, 0, 1]]);
minimumInconvenienceBruteForc([[1, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);