/*
 * @lc app=leetcode id=212 lang=javascript
 *
 * [212] Word Search II
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
/* 回溯算法 DFS
 *数据范围只有 1212，且 words 中出现的单词长度不会超过 1010，可以考虑使用「回溯算法」。
 **/
var findWords = function (board, words) {
  let [set, ans, m, n] = [new Set(words), [], board.length, board[0].length];
  let dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let dfs = (i, j, sb) => {
    if (sb.length > 10) return;
    if (set.has(sb.join(""))) {
      ans.push(sb.join(""));
      set.delete(sb.join(""));
    }

    for (let d of dirs) {
      let [dx, dy] = [i + d[0], j + d[1]];
      if (dx < 0 || dx >= m || dy < 0 || dy >= n || board[dx][dy] === "#") continue;
      sb.push(board[dx][dy]);
      board[dx][dy] = "#";
      dfs(dx, dy, sb);
      board[dx][dy] = sb.pop(); // 还原
    }
  };

  let string = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      string.push(board[i][j]);
      board[i][j] = "#";
      dfs(i, j, string);
      board[i][j] = string.pop(); // 还原
    }
  }

  return ans;
};

/* Solution 2: Trie */
var findWords = function (board, words) {
  const dirs = [
    [-1, 0],
    [0, -1],
    [1, 0],
    [0, 1],
  ];
  const res = [];

  const buildTrie = (root = {}) => {
    for (const w of words) {
      let node = root;
      for (const c of w) {
        node[c] = node[c] || {};
        node[c].count = node[c].count + 1 || 1;
        node = node[c];
      }
      node.end = w;
    }
    return root;
  };

  const search = (root, x, y) => {
    const c = board?.[x]?.[y];
    const node = root?.[c];
    if (!c || !node) return;

    if (node.end) {
      res.push(node.end);
      deleteNode(node.end);
      node.end = null;
    }

    board[x][y] = "#";
    for (const [dx, dy] of dirs) {
      const i = x + dx;
      const j = y + dy;

      search(node, i, j);
    }
    board[x][y] = c;
  };

  const deleteNode = (w) => {
    let toDelete = root;
    for (const c of w) {
      toDelete[c].count--;
      if (!toDelete[c].count) {
        delete toDelete[c];
        break;
      }
      toDelete = toDelete[c];
    }
  };

  const root = buildTrie();

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      search(root, i, j);
    }
  }

  return res;
};

findWords([["a", "a"]], ["oath", "pea", "eat", "rain"]);
// @lc code=end
