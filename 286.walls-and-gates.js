/*
 * @lc app=leetcode id=286 lang=javascript
 *
 * [286] Walls and Gates
 */
/**
 * @param {number[][]} rooms
 * @return {void} Do not return anything, modify rooms in-place instead.
 */
var wallsAndGates = function (rooms) {
  //0 注水点 -1 平原 inf 盆地
  var EMPTY = 2147483647;
  if (rooms == null || !rooms.length || !rooms[0].length) return;
  let row = rooms.length;
  let col = rooms[0].length;
  let dx = [0, 1, 0, -1];
  let dy = [1, 0, -1, 0]

  let qx = [];
  let qy = [];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (rooms[i][j] == 0) {
        qx.push(i);
        qy.push(j);
      }
    }
  }


  while (qx.length) {
    let cx = qx.shift();
    let cy = qy.shift();

    for (let i = 0; i < 4; i++) {
      let nx = cx + dx[i];
      let ny = cy + dy[i];

      //console.log(nx, ny);
      if (0 <= nx && nx < row && 0 <= ny && ny < col && rooms[nx][ny] == EMPTY) {

        rooms[nx][ny] = rooms[cx][cy] + 1;
        qx.push(nx);
        qy.push(ny);

      }
    }

  }

};

