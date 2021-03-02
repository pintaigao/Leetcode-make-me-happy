/*
 * @lc app=leetcode id=286 lang=javascript
 *
 * [286] Walls and Gates
 */
/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */

// 这算是BFS的方法
var wallsAndGates = function (rooms) {
  //0 注水点 -1 平原 inf 盆地
  var EMPTY = 2147483647;
  if (rooms == null || !rooms.length || !rooms[0].length) return;
  let row = rooms.length;
  let col = rooms[0].length;
  let direction = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let queue = [];

  //  Find the first gate
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (rooms[i][j] == 0) {
        queue.push([i, j]);
      }
    }
  }

  while (queue.length) {
    let c = queue.shift();

    for (let i = 0; i < 4; i++) {
      let nx = c[0] + direction[i][0];
      let ny = c[1] + direction[i][1];

      //console.log(nx, ny);
      if (
        0 <= nx &&
        nx < row &&
        0 <= ny &&
        ny < col &&
        rooms[nx][ny] == EMPTY
      ) {
        rooms[nx][ny] = rooms[c[0]][c[1]] + 1;
        console.log(rooms);
        queue.push([nx, ny]);
      }
    }

    console.log(queue);
  }
  return rooms;
};

wallsAndGates([
  [2147483647, -1, 0, 2147483647],
  [2147483647, 2147483647, 2147483647, -1],
  [2147483647, -1, 2147483647, -1],
  [0, -1, 2147483647, 2147483647],
]);
