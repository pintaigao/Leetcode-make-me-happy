/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */

// Trie 字典树


// DFS 深度优先搜索
var findWords = function (board, words) {
  let set = new Set(words), ans = [], m = board.length, n = board[0].length, dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]], path = [];

  function traveler(i, j) {
    if (path.length > 10) return;
    if (set.has(path.join(""))) {
      ans.push(path.join(""));
      set.delete(path.join(""));
    }

    for (let d of dirs) {
      let [dx, dy] = [i + d[0], j + d[1]];
      if (dx < 0 || dx >= m || dy < 0 || dy >= n || board[dx][dy] === "#") continue;
      let tempWord = board[dx][dy];
      path.push(board[dx][dy]);
      board[dx][dy] = "#";
      traveler(dx, dy);
      board[dx][dy] = tempWord;
      path.pop();
    }
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let tempWord = board[i][j];
      path.push(board[i][j]);
      board[i][j] = "#";
      traveler(i, j);
      board[i][j] = tempWord;
      path.pop();
    }
  }

  return ans;
};

