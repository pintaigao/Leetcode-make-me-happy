import UF from '../../Algorithm/union-find'

var equationsPossible = function (equations) {
  // 26 个英文字母
  const uf = new UF(26);
  // 先让相等的字母形成连通分量
  for (const eq of equations) {
    if (eq.charAt(1) === '=') {
      const x = eq.charAt(0);
      const y = eq.charAt(3);
      uf.union(x.charCodeAt(0) - 'a'.charCodeAt(0), y.charCodeAt(0) - 'a'.charCodeAt(0));
    }
  }
  // 检查不等关系是否打破相等关系的连通性
  for (const eq of equations) {
    if (eq.charAt(1) === '!') {
      const x = eq.charAt(0);
      const y = eq.charAt(3);
      // 如果相等关系成立，就是逻辑冲突
      if (uf.connected(x.charCodeAt(0) - 'a'.charCodeAt(0), y.charCodeAt(0) - 'a'.charCodeAt(0))) {
        return false;
      }
    }
  }
  return true;
};


// DFS
var equationsPossible2 = function (equations) {
  const graph = Array.from({ length: 26 }, () => []);

  // 构建图，只有相等关系才构建边
  for (const eq of equations) {
    if (eq[1] === '=') {
      const a = eq.charCodeAt(0) - 97, b = eq.charCodeAt(3) - 97;
      graph[a].push(b);
      graph[b].push(a);
    }
  }


  // Main Logic
  for (const eq of equations) {
    if (eq[1] === '!') {
      const a = eq.charCodeAt(0) - 97, b = eq.charCodeAt(3) - 97;

      if (a === b) return false;

      const visited = new Array(26).fill(false);
      if (dfs(a, b, visited)) return false;
    }
  }

  function dfs(start, target, visited) {
    if (start === target) return true;
    visited[start] = true;

    for (const next of graph[start]) {
      if (!visited[next] && dfs(next, target, visited)) {
        return true;
      }
    }

    return false;
  }

  return true;
};

// BFS
var equationsPossible3 = function (equations) {
  const graph = Array.from({ length: 26 }, () => []);

  for (const eq of equations) {
    if (eq[1] === '=') {
      const a = eq.charCodeAt(0) - 97, b = eq.charCodeAt(3) - 97;
      graph[a].push(b);
      graph[b].push(a);
    }
  }

  for (const eq of equations) {
    if (eq[1] === '!') {
      const a = eq.charCodeAt(0) - 97, b = eq.charCodeAt(3) - 97;
      const visited = new Array(26).fill(false);
      let queue = [a];

      while (queue.length) {
        let char = queue.shift();
        visited[char] = true;

        if (char === b) {
          return false;
        }

        for (const next of graph[char]) {
          !visited[next] && queue.push(next);
        }
      }
    }
  }
  return true;
};