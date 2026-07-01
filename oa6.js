function arrayGenerator(arr, state, m) {
  const n = arr.length;
  const result = [];

  let stateArr = state.split("");

  let maxAvailable = -Infinity;

  // 初始化当前 available 的最大值
  for (let i = 0; i < n; i++) {
    if (stateArr[i] === "1") {
      maxAvailable = Math.max(maxAvailable, arr[i]);
    }
  }

  // 如果一开始没有任何 available，但 m > 0，就无法生成
  if (maxAvailable === -Infinity) {
    return []; // 或者根据题目要求 return -1
  }

  for (let step = 0; step < m; step++) {
    // 1. append 当前最大 available value
    result.push(maxAvailable);

    // 2. 找本轮新 unlock 的位置
    const newlyUnlocked = [];

    for (let i = 1; i < n; i++) {
      if (stateArr[i] === "0" && stateArr[i - 1] === "1") {
        newlyUnlocked.push(i);
      }
    }

    // 3. 同时更新 state，并更新 maxAvailable
    for (const i of newlyUnlocked) {
      stateArr[i] = "1";
      maxAvailable = Math.max(maxAvailable, arr[i]);
    }
  }

  return result;
}