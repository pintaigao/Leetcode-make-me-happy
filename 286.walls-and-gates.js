/*
 * @lc app=leetcode id=286 lang=javascript
 *
 * [286] Walls and Gates
 */

// @lc code=start
/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function (rooms) {
  if (rooms == null || !rooms.length || !rooms[0].length) return;
  var [EMPTY, row, col, queue] = [2147483647, rooms.length, rooms[0].length, []];
  let direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  //  Find the gate
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (rooms[i][j] == 0) {
        queue.push([i, j]);
      }
    }
  }

  while (queue.length) {
    let [x, y] = queue.shift();
    for (let i = 0; i < 4; i++) {
      let nx = x + direction[i][0];
      let ny = y + direction[i][1];

      if (0 <= nx && nx < row && 0 <= ny && ny < col && rooms[nx][ny] == EMPTY) {
        rooms[nx][ny] = rooms[x][y] + 1;
        queue.push([nx, ny]);
      }
    }
  }
  return rooms;
};
// @lc code=end
