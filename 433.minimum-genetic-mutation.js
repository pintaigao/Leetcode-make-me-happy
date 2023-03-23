/*
 * @lc app=leetcode id=433 lang=javascript
 *
 * [433] Minimum Genetic Mutation
 */

// @lc code=start
/**
 * @param {string} startGene
 * @param {string} endGene
 * @param {string[]} bank
 * @return {number}
 */
var minMutation = function (start, end, bank) {
  // 1：判断极端情况
  if (!start || !end || !bank.length) {
    return -1;
  }
  if (!bank.includes(end)) { // 目标基因不在基因库中
    return -1;
  }

  // 2：bfs的初始化工作
  const visit = new Array(bank.length).fill(0);
  let step = 0;
  const queue = [start];

  // 3：进行bfs
  while (queue.length) {
    const n = queue.length; // 确定每次bfs的宽度
    step++;
    for (let i = 0; i < n; i++) {
      const temp = queue.shift(); // 这里获得队头元素不要用引用，至于具体原因可以参考评论区链接
      for (let j = 0; j < bank.length; j++) { // 遍历整个基因库，访问未标记的基因；找到某个字符变异的基因添加标记，并进入队列即可
        if (!visit[j]) {
          let diff = 0;
          for (let k = 0; k < temp.length; k++) {
            if (temp[k] !== bank[j][k]) {
              diff++;
            }
          }
          if (diff === 1) { // 找到某个字符编译的基因
            if (bank[j] === end) {
              return step; // 若该下标j代表的基因为目标基因，则直接返回步长
            }
            visit[j] = 1; // 标记下标为j的基因已访问
            queue.push(bank[j]);
          }
        }
      }
    }
  }
  return -1;
};
// @lc code=end

