/*
 * @lc app=leetcode id=735 lang=javascript
 *
 * [735] Asteroid Collision
 */

// @lc code=start
/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  let stack = [];
  for (let i = 0; i < asteroids.length; i++) {
    if (stack.length == 0 || asteroids[i] > 0) {
      console.log("当stack为0或者asteroids[i] > 0时");
      stack.unshift(asteroids[i]);
      console.log(stack);
      continue;
    }

    // 当遇到负数的时候
    console.log("遇到了负数");
    while (true) {
      let prev = stack[0];
      console.log("stack is: " + stack + " and the peek is: " + stack[0]);
      if (prev < 0) {
        // 首先的为负数
        // 已存在的一定是负数会一直向左
        stack.unshift(asteroids[i]);
        break;
      } else if (prev == Math.abs(asteroids[i])) {
        // 遇到相同的，排除这个
        console.log("Come to here");
        stack.shift();
        break;
      } else if (prev > Math.abs(asteroids[i])) {
        // 我们要prev不要这个负数
        break;
      } else if (prev < Math.abs(asteroids[i])) {
        // 负数这个大于stack的peek
        stack.shift();
        if (stack.length == 0) {
          stack.unshift(asteroids[i]);
          break;
        }
      }
    }
  }

  return stack.reverse();
};

asteroidCollision([0, 10, 2, -5, 5, -5, -5]);
// @lc code=end
