/*
 * @lc app=leetcode id=874 lang=javascript
 *
 * [874] Walking Robot Simulation
 */

// @lc code=start
/**
 * @param {number[]} commands
 * @param {number[][]} obstacles
 * @return {number}
 */
var robotSim = function (commands, obstacles) {
  // 右， 下， 左， 上 （这是坐标不是2d Array）(0,1 => X=0, Y=1)
  let directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  // Set of obstacles indexes in the format of : obstacle[0] + " " + obstacle[1]
  let obstaclesSet = new Set();
  for (let obstacle of obstacles) {
    obstaclesSet.add(obstacle[0] + " " + obstacle[1]);
  }

  let x = 0,
    y = 0,
    direction = 0,
    maxDistSquare = 0;

  // Loop through the commands
  for (let i = 0; i < commands.length; i++) {
    if (commands[i] == -2) {
      // Turns left 相当于在这个方向上向右转3次
      direction = (direction + 3) % 4;
    } else if (commands[i] == -1) {
      // Turns right 相当于在这个方向上向右转1次
      direction = (direction + 1) % 4;
    } else {
      // Moves forward commands[i] steps
      let step = 0;
      // 一格一格的走(while里面讨论的是每走一步的情况)，如果碰到障碍了就到下一个
      while (
        step < commands[i] &&
        !obstaclesSet.has(
          x + directions[direction][0] + " " + (y + directions[direction][1])
        )
      ) {
        x += directions[direction][0];
        y += directions[direction][1];
        step += 1;
      }
    }
    maxDistSquare = Math.max(maxDistSquare, x * x + y * y);
  }

  return maxDistSquare;
};
// @lc code=end
