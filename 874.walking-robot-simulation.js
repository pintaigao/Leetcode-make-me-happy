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
  for (let i = 0; i < commands.length; i++) {
    if (commands[i] == -2) {
      // Turns left
      direction = (direction + 3) % 4;
    } else if (commands[i] == -1) {
      // Turns right
      direction = (direction + 1) % 4;
    } else {
      // Moves forward commands[i] steps
      let step = 0;
      // 一格一格诺，如果碰到障碍了就到下一个
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
