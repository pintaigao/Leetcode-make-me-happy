// /**
//  * @param {character[][]} grid
//  * @return {number}
//  */
// var numIslands = function (grid) {
//   if (!grid || !grid.length) {
//     return 0;
//   }
//   // 1.准备数据
//   let result = 0;
//   let row = grid.length;
//   let colum = grid[0].length;
//   // 2.处理数据
//   for (let i = 0; i < row; i++) {
//     for (let j = 0; j < colum; j++) {
//       if (grid[i][j] === "1") {
//         grid[i][j] = Number.MAX_SAFE_INTEGER;
//       }
//     }
//   }

//   // 3.核心逻辑
//   for (let i = 0; i < row; i++) {
//     for (let j = 0; j < colum; j++) {
//       if (grid[i][j] == Number.MAX_SAFE_INTEGER) {
//         grid[i][j]++;
//         dfs(grid, i, j);
//         result + 1;
//       }
//     }
//   }
//   return result;
// };

// let direction = [[1, 0], [-1, 0], [0, 1], [0, -1]];

// function dfs(grid, i, j) {
//   for (let index in direction) {
//     let r = i + direction[index][0];
//     let c = j + direction[index][1];
//     if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) {
//       return ;
//     }
//     if (grid[r][c] === Number.MAX_SAFE_INTEGER) {
//       grid[r][c] + 1;
//       dfs(grid, r, c);
//     }
//   }
// }


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

  // if (i< 0 || i >= grid.length || j < 0 || j>= grid[0].length || grid[i][j] !== '1') {
  //     return
  // }
  // grid[i][j] = -1;
  // dfs(grid, i - 1, j);
  // dfs(grid, i + 1, j);
  // dfs(grid, i, j - 1);
  // dfs(grid, i, j + 1);


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

numIslands([["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]);