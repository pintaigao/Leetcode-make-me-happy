/**
 * @param {number[][]} bombs
 * @return {number}
 */
var maximumDetonation = function (bombs) {
  let res = 0, queue = [];
  // 不是从单一一个炸弹 bfs，而是每一个炸弹都bfs 一遍
  for (let i = 0; i < bombs.length; i++) {
    let visited = new Array(bombs.length).fill(false), tempRes = 0;
    visited[i] = true;
    queue = [bombs[i]];

    while (queue.length) {
      bomb = queue.shift();
      tempRes += 1;
      res = Math.max(res, tempRes);

      for (let j = 0; j < bombs.length; j++) {
        if (!visited[j] && (bombs[j][0] - bomb[0]) ** 2 + (bombs[j][1] - bomb[1]) ** 2 <= bomb[2] ** 2) {
          queue.push(bombs[j])
          visited[j] = true;
        }
      }
    }
  }

  return res;
};

// BFS + 邻接表 (多个领接表，先计算出每个节点的领接表，再进行 BFS 遍历，每次 BFS 遍历时，直接访问领接表中的节点，避免了重复计算距离)
var maximumDetonation = function (bombs) {
  // 邻接表存储图
  let graph = Array.from({ length: bombs.length }, () => []), res = 0;
  // 初始化邻接表
  for (let i = 0; i < bombs.length; i++) {
    for (let j = 0; j < bombs.length; j++) {
      if (i !== j && (bombs[i][0] - bombs[j][0]) ** 2 + (bombs[i][1] - bombs[j][1]) ** 2 <= bombs[i][2] ** 2) {
        graph[i].push(j);
      }
    }
  }

  for (let i = 0; i < bombs.length; i++) {
    // 以节点 i 进行 BFS 遍历，返回可达的节点数量
    let count = 0, q = [i], visited = Array(graph.length).fill(false);
    visited[i] = true;
    while (q.length) {
      let node = q.shift();
      count++;
      for (let neighbor of graph[node]) {
        if (!visited[neighbor]) {
          q.push(neighbor);
          visited[neighbor] = true;
        }
      }
    }

    max = Math.max(max, count);
  }
  return max;
};

// BFS 算法框架
