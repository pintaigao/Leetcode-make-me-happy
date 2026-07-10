var slidingPuzzle = function (board) {
  // 将 2x3 的数组转化成字符串作为 BFS 的起点
  let target = "123450", start = "";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      start += board[i][j];
    }
  }

  // ****** BFS 算法框架开始 ******
  let queue = [start], visited = new Set([start]), step = 0;
  while (queue.length > 0) {
    const sz = queue.length;
    for (let i = 0; i < sz; i++) {
      const cur = queue.shift();
      // 判断是否达到目标局面
      if (cur === target) { return step; }
      // 将数字 0 和相邻的数字交换位置
      for (const neighbor of getNeighbors(cur)) {
        // 防止走回头路
        if (!visited.has(neighbor)) {
          queue.push(neighbor);
          visited.add(neighbor);
        }
      }
    }
    step++;
  }

  // ****** BFS 算法框架结束 ******
  return -1;
};

function getNeighbors(board) {
  // 记录一维字符串的相邻索引
  // mapping[0] = [1, 3]，表示索引 0 的数字可以和索引 1、3 的数字交换
  // mapping[1] = [0,4,2]，index 1 的数字左下右的 index 分别是 0、4、2
  const mapping = [[1, 3], [0, 4, 2], [1, 5], [0, 4], [3, 1, 5], [4, 2]], idx = board.indexOf('0'), neighbors = [];
  for (const adj of mapping[idx]) {
    const newBoard = swap(board, idx, adj);
    neighbors.push(newBoard);
  }
  return neighbors;
}

function swap(board, i, j) {
  const chars = board.split('');
  [chars[i], chars[j]] = [chars[j], chars[i]];
  return chars.join('');
}