var crackSafe = function (n, k) {
  const start = "0".repeat(n - 1), visited = new Set(), result = [];

  function dfs(node) {
    for (let i = 0; i < k; i++) {
      const ch = String(i);
      const edge = node + ch;
      if (!visited.has(edge)) {
        visited.add(edge);
        // next node = edge 的后 n - 1 位
        const nextNode = edge.slice(1);
        dfs(nextNode);
        // 后序加入字符：先探路，回来的时候再记录。
        //普通 DFS 直接加字符，可能会提前走进死胡同。
        // Hierholzer 的思路是：先把边走完，走不动了再把当前边的字符加入结果。

        result.push(ch);
      }
    }
  }

  dfs(start);

  return start + result.reverse().join("");
};

crackSafe(2, 2); // "00110"