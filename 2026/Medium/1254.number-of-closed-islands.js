/*
 * @lc app=leetcode id=1254 lang=javascript
 *
 * [1254] Number of Closed Islands
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */

// Solution 1: DFS的方法
// 只有一种情况会失败，就是这个岛碰到edge了
var closedIsland = function (grid) {
  //count the number
  let count = 0;

  // DFS的方法
  let dfs = function (row, col) {
    //if we meet the edge return 0;
    if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
      return 0;
    }

    if (grid[row][col] == 1) {
      return 1; //if we meet 1 return 1;
    }

    // 如果我们遇到了0，把它改成1，然后递归上下左右去找
    // 走完所有的dfs递归，最终得到up down left right，相当于岛是一个整体，它的上下左右看是不是都是1（水）
    grid[row][col] = 1;
    let up = dfs(row - 1, col);
    let down = dfs(row + 1, col);
    let left = dfs(row, col - 1);
    let right = dfs(row, col + 1);
    if (up === 0 || down == 0 || left == 0 || right == 0) {
      // Edge
      return 0;
    } else {
      return 1;
    }
    // return up & down & left & right; //any of the side meet the edge,is not a island;
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] == 0) {
        // 如果是土地，就让他走一遍dfs，然后把所有连着的0都改成1
        count += dfs(i, j);
      }
    }
  }
  return count;
};

closedIsland([
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0],
]);

// DFS的方法2
var closedIsland2 = function (grid) {
  let res = 0;
  const dfs = function (grid, i, j) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return;
    if (grid[i][j] == 1) return;
    grid[i][j] = 1;
    dfs(grid, i - 1, j);
    dfs(grid, i + 1, j);
    dfs(grid, i, j - 1);
    dfs(grid, i, j + 1);
  };
  let m = grid.length,
    n = grid[0].length;
  // 查看上下边的岛屿，exclude他们
  for (let j = 0; j < n; j++) {
    dfs(grid, 0, j);
    dfs(grid, m - 1, j);
  }

  // 查看左右边的岛屿，exclude他们
  for (let i = 0; i < m; i++) {
    dfs(grid, i, 0);
    dfs(grid, i, n - 1);
  }

  // 查看是否还有岛屿
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == 0) {
        res++;
        dfs(grid, i, j);
      }
    }
  }
  return res;
};

// Solution 2: BFS的方法
var closedIsland2 = function (grid) {
  let rows = grid.length,
    cols = grid[0].length;
  // 方向数组
  let directions = [
    [0, 1],
    [0, -1],
    [-1, 0],
    [1, 0],
  ];
  // BFS的方法
  const bfs = (i, j) => {
    let queue = [[i, j]];
    while (queue.length) {
      let size = queue.length;
      for (let k = 0; k < size; k++) {
        // 队首元素出队列
        let [curI, curJ] = queue.shift();
        // 如果是超过边界或者是1，就跳过
        for (let dir of directions) {
          if (curI + dir[0] >= 0 && curI + dir[0] < rows && curJ + dir[1] >= 0 && curJ + dir[1] < cols && grid[curI + dir[0]][curJ + dir[1]] == 0) {
            queue.push([curI + dir[0], curJ + dir[1]]);
          }
        }
        // 淹没它
        grid[curI][curJ] = 1;
      }
    }
  };
  // 把四周的岛屿都淹成海洋
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (
        (i == 0 || i == rows - 1 || j == 0 || j == cols - 1) &&
        grid[i][j] == 0
      )
        bfs(i, j);
    }
  }

  // 找剩下的岛屿
  let count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      // 如果是岛屿，则作为BFS的入口
      if (grid[i][j] == 0) {
        bfs(i, j);
        count++;
      }
    }
  }
  return count;
};

closedIsland2([
  [1, 1, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 1, 0],
  [1, 0, 1, 0, 1, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0],
]);

// Solution 3: Union Find
// @lc code=end


// 练习
var closedIsland3 = function (grid) {
  let count = 0, directions = [[0, 1], [0, -1], [-1, 0], [1, 0]];

  // If we meet the edge, we will flood fill it to water, so that we can exclude those islands connected to the edge.
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      // If the current cell is in the first or last row, or in the first or last column, and the value of the current cell is 0…
      if (((i == 0 || i == grid.length - 1 || j == 0 || j == grid[0].length - 1)) && grid[i][j] == 0) {
        // …we will flood fill it to water, so that we can exclude those islands connected to the edge.
        dfs(i, j);
      }
    }
  }

  // After we have excluded those islands connected to the edge, we can count the number of closed islands by iterating through the grid and performing a DFS for each unvisited land cell (0).
  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      if (grid[i][j] == 0) {
        count++;
        dfs(i, j);
      }
    }
  }

  // First we will define a dfs function that takes the current cell's coordinates as parameters. 
  function dfs(i, j) {
    // First we define a termination condition for the DFS. If the current cell is out of bounds or is water (1), we will return immediately.
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == 1) {
      return;
    }

    // After the termination condition, we will mark the current cell as visited by changing its value to 1 (water). This way, we can avoid visiting the same cell again in future DFS calls.
    grid[i][j] = 1;

    // Then we will recursively call the DFS function for the four adjacent cells (up, down, left, right) using the directions array.
    for (let dir of directions) {
      dfs(i + dir[0], j + dir[1]);
    }
  }

  return count;
}

// BFS 练习
var closedIsland4 = function (grid) {
  let count = 0, directions = [[0, 1], [0, -1], [-1, 0], [1, 0]];
  let queue = [];


  // Find Edge Case
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (((i == 0 || i == grid.length - 1 || j == 0 || j == grid[0].length - 1)) && grid[i][j] == 0) {
        queue.push([i, j]);
        while (queue.length) {
          let [currI, currJ] = queue.shift();
          grid[currI][currJ] = 1;

          for (let dir of directions) {
            let nextI = currI + dir[0], nextJ = currJ + dir[1];

            if (nextI >= 0 && nextI < grid.length && nextJ >= 0 && nextJ < grid[0].length && grid[nextI][nextJ] == 0) {
              queue.push([nextI, nextJ]);
            }
          }
        }
      }
    }
  }

  // Count the number of closed islands
  for (let j = 1; j < grid[0].length - 1; j++) {
    for (let i = 1; i < grid.length - 1; i++) {
      if (grid[i][j] == 0) {
        count++;
        queue.push([i, j]);
        while (queue.length) {
          let [currI, currJ] = queue.shift();
          grid[currI][currJ] = 1;

          for (let dir of directions) {
            let nextI = currI + dir[0], nextJ = currJ + dir[1];

            if (nextI >= 0 && nextI < grid.length && nextJ >= 0 && nextJ < grid[0].length && grid[nextI][nextJ] == 0) {
              queue.push([nextI, nextJ]);
            }
          }
        }
      }
    }
  }
  return count;
}

// DFS 练习2
var closedIsland3Imporved = function (grid) {
  let count = 0, directions = [[0, 1], [0, -1], [-1, 0], [1, 0]];

  // If we meet the edge, we will flood fill it to water, so that we can exclude those islands connected to the edge.
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      // If the current cell is in the first or last row, or in the first or last column, and the value of the current cell is 0…
      if (grid[i][j] == 0 && dfs(i, j)) {
        count++;
      }
    }
  }

  // First we will define a dfs function that takes the current cell's coordinates as parameters. 
  function dfs(i, j) {
    // First we define a termination condition for the DFS. If the current cell is out of bounds or is water (1), we will return immediately.
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
      return false;
    }

    if (grid[i][j] !== 0) {
      return true;
    }

    // After the termination condition, we will mark the current cell as visited by changing its value to 1 (water). This way, we can avoid visiting the same cell again in future DFS calls.
    grid[i][j] = -1;

    let top = dfs(i - 1, j);
    let bottom = dfs(i + 1, j);
    let left = dfs(i, j - 1);
    let right = dfs(i, j + 1);

    return top && bottom && left && right;
  }

  return count;
}
