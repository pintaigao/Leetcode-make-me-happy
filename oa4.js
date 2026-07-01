function minOperationsToMakeValid(arr) {
  let n = arr.length, last = new Map(), distinct = new Set();

  // 记录每个 value 最后一次出现的位置
  for (let i = 0; i < n; i++) {
    last.set(arr[i], i);
    distinct.add(arr[i]);
  }

  let blocks = 0, end = 0;

  for (let i = 0; i < n; i++) {
    end = Math.max(end, last.get(arr[i]));

    // 当扫描到 i === end，说明：当前 segment 里出现过的所有 value，以后都不会再出现了
    if (i === end) {
      blocks++;
    }
  }

  return distinct.size - blocks;
}