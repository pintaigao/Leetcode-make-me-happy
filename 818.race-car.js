/*
 * @lc app=leetcode id=818 lang=javascript
 *
 * [818] Race Car
 */

// @lc code=start
/**
 * @param {number} target
 * @return {number}
 */

/* BFS */

var racecar = function (target) {
  let queue = [[0, 1]]; // starts from position 0 with speed 1
  let visited = new Set(["0 1"]);

  for (let level = 0; queue.length; level++) {
    for (let k = queue.length; k > 0; k--) {
      let cur = queue.shift(); // cur[0] is position; cur[1] is speed

      if (cur[0] == target) {
        return level;
      }

      let nxt = [cur[0] + cur[1], cur[1] * 2]; // accelerate instruction
      let key = nxt[0] + " " + nxt[1];

      if (!visited.has(key) && 0 < nxt[0] && nxt[0] < target * 2) {
        queue.push(nxt);
        visited.add(key);
      }

      nxt = [cur[0], cur[1] > 0 ? -1 : 1]; // reverse instruction
      key = nxt[0] + " " + nxt[1];

      if (!visited.has(key) && 0 < nxt[0] && nxt[0] < target * 2) {
        queue.push(nxt);
        visited.add(key);
      }
    }
  }

  return -1;
};

/*
 * DP
 * 设dp[i]就等于 target = i时，需要的最小步数。
 */

let racecar = function (target) {
  //处理边界
  if (target <= 0) {
    return 0;
  }

  // dp[i]就等于 target = i时，需要的最小步数。
  let dp = new Array(target + 1).fill(Number.MAX_VALUE);

  for (let i = 1; i <= target; i++) {
    //先向前走 forward 步
    for (let forward = 1; 2 ** forward - 1 < 2 * i; forward++) {
      //向前走了forwardDistance
      let forwardDistance = 2 ** forward - 1;
      //对应第一种情况，走了forward步直接到达i
      if (forwardDistance == i) {
        dp[i] = forward;
      } else if (forwardDistance > i) {
        //对应第二种情况，越过了i (target)，即假如2个A后跑到了position=3，但是target=2，所以往后走一步，即dp[forward的次数-target]=dp[2-1],即往后走dp[1]就行了
        // +1 是因为回头需要一个R指令
        dp[i] = Math.min(dp[i], forward + 1 + dp[forwardDistance - i]);
      } else {
        //对应第三种情况，没有越过i
        //先回头走backward步
        for (let backward = 0; backward < forward; backward++) {
          let backwardDistance = 2 ** backward - 1;
          //第一个+1是还没到达i，先回头，使用一个R
          //第二个+1是回头走了backwardDistance，再使用R回头走向i
          dp[i] = Math.min(dp[i], forward + 1 + backward + 1 + dp[i - forwardDistance + backwardDistance]);
        }
      }
    }
  }
  return dp[target];
};
// @lc code=end
