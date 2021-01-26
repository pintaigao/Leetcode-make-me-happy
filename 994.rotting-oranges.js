/*
 * @lc app=leetcode id=994 lang=javascript
 *
 * [994] Rotting Oranges
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var orangesRotting = function (grid) {
  let queue = [];

  // Step 1). build the initial set of rotten oranges
  let freshOranges = 0;
  let ROWS = grid.length,
    COLS = grid[0].length;

  for (let r = 0; r < ROWS; ++r)
    for (let c = 0; c < COLS; ++c)
      if (grid[r][c] == 2) queue.push([r, c]);
      else if (grid[r][c] == 1) freshOranges++;

  // 以上，统计2的位置，以及1有多少个
  queue.push([-1, -1]);

  // Step 2). start the rotting process via BFS
  let minutesElapsed = -1;
  let directions = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  console.log(`Before go into the loop the queue is:`);
  console.log(queue);
  console.log();

  while (queue.length !== 0) {
    let p = queue.shift();
    let row = p[0];
    let col = p[1];
    console.log(`Now is [${row}, ${col}]`);

    if (row == -1) {
      // We finish one round of processing
      minutesElapsed += 1;
      // to avoid the endless loop
      if (queue.length !== 0) queue.push([-1, -1]);
    } else {
      // this is a rotten orange
      // then it would contaminate its neighbors
      for (let d of directions) {
        let neighborRow = row + d[0];
        let neighborCol = col + d[1];
        if (
          neighborRow >= 0 &&
          neighborRow < ROWS &&
          neighborCol >= 0 &&
          neighborCol < COLS &&
          grid[neighborRow][neighborCol] == 1
        ) {
          // this orange would be contaminated
          grid[neighborRow][neighborCol] = 2;
          freshOranges -= 1;
          // this orange would then contaminate other oranges
          queue.push([neighborRow, neighborCol]);
        }
      }
    }

    console.log(queue);
    console.log(freshOranges);
  }

  // return elapsed minutes if no fresh orange left
  return freshOranges == 0 ? minutesElapsed : -1;
};
// @lc code=end

orangesRotting([
  [2, 1, 1],
  [1, 1, 0],
  [0, 1, 1],
]);
