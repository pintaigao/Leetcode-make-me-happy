// 1. DFS 没有 Memo
var findRotateSteps = function (ring, key) {
  let n = ring.length, map = new Map();

  for (let i = 0; i < n; i++) {
    if (!map.has(ring[i])) {
      map.set(ring[i], []);
    }
    map.get(ring[i]).push(i);
  }

  function getDist(i, j) {
    // 计算从 i 到 j 的最短旋转距离（顺时针 or 逆时针）
    const diff = Math.abs(i - j);
    return Math.min(diff, n - diff);
  }

  function dfs(ringIndex, keyIndex) {
    if (keyIndex === key.length) { return 0; }
    let ans = Infinity;
    for (const nextIndex of map.get(key[keyIndex])) {
      let rotateSteps = getDist(ringIndex, nextIndex), pressStep = 1;
      // nextIndex 充当 12 点钟方向，计算旋转到 nextIndex 的步数 + 按下按钮的步数 + 继续搜索下一个字符的步数
      ans = Math.min(ans, rotateSteps + pressStep + dfs(nextIndex, keyIndex + 1));
    }

    return ans;
  }

  return dfs(0, 0);
};

// 2. DFS + Memo
var findRotateSteps = function (ring, key) {
  const n = ring.length, map = new Map(), memo = Array.from({ length: ring.length }, () => Array(key.length).fill(null));

  for (let i = 0; i < n; i++) {
    const ch = ring[i];
    if (!map.has(ch)) {
      map.set(ch, []);
    }
    map.get(ch).push(i);
  }


  function getDist(i, j) {
    const diff = Math.abs(i - j);
    return Math.min(diff, n - diff);
  }

  function dfs(ringIndex, keyIndex) {
    if (keyIndex === key.length) {
      return 0;
    }

    if (memo[ringIndex][keyIndex] !== null) {
      return memo[ringIndex][keyIndex];
    }

    let ans = Infinity;

    for (const nextIndex of map.get(key[keyIndex])) {
      // 当前 ringIndex 充当 12 点钟方向，计算旋转到 nextIndex 的步数 + 按下按钮的步数 + 继续搜索下一个字符的步数
      ans = Math.min(ans, getDist(ringIndex, nextIndex) + 1 + dfs(nextIndex, keyIndex + 1));
    }

    memo[ringIndex][keyIndex] = ans;
    return ans;
  }

  return dfs(0, 0);
};