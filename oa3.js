function minimumDroneDeliveryTime(distances, destinations) {
  const n = distances.length, prefix = new Array(n + 1).fill(0), current = 1, answer = 0;

  // i代表的是第i个仓库
  for (let i = 0; i < n; i++) {
    // clockwise 方向
    // 所以prefix[i + 1]的值是 i 到 i+1 的距离总和，除了最后一个值表示最后一个仓库到第一个的距离
    prefix[i + 1] = prefix[i] + distances[i];
  }

  const total = prefix[n];

  function shortestDistance(from, to) {
    let clockwiseCost = prefix[to] - prefix[from];
    if (clockwiseCost < 0) { clockwiseCost += total; } // 即 to 在 from 的前面，要从 from 绕一圈才到 to
    // counterClockwise 即顺时针绕一圈所需 - 计算获得的顺时针clockwise cost
    const counterClockwiseCost = total - clockwiseCost;
    return Math.min(clockwiseCost, counterClockwiseCost);
  }

  for (const dest of destinations) {
    // current 和 dest 都是 1-indexed 的 hub 编号；shortestDistance 内部会统一转换成 0-indexed。
    answer += shortestDistance(current - 1, dest - 1);
    current = dest;
  }

  return answer;
}

// 例子
minimumDroneDeliveryTime([1, 2, 3, 4], [2, 3, 4, 1]);