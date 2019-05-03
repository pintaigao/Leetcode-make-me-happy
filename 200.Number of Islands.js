var numIslands = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        console.log(`Before turn into -1 the grid is:`);
        console.log(grid);
        console.log(`Count will plus 1 and i is ${i} and j is ${j}`);
        grid[i][j] = -1;
        count++;
        dfs(grid, i, j);
      }
    }
  }

  console.log(count);
  return count;
};

let direction = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function dfs(grid, i, j) {
  numIslands([["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]);
  for (let index = 0; index < direction.length; index++) {
    let r = i + direction[index][0];
    let c = j + direction[index][1];
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== '1') {
      continue;
    }
    grid[r][c] = -1;
    dfs(grid, r, c);
  }
}
