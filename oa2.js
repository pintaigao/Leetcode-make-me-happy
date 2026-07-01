function minimumRedistributionCost(products) {
  const n = products.length, total = products.reduce((sum, x) => sum + x, 0);

  if (total % n !== 0) return -1;
  const target = total / n;

  function clockwiseCost(arr) {
    // prefix 上的每个位置的值，表示到当前 warehouse，还有多少个货物要往下传
    // 如[7,0,0,0,3] => prefix: [5, 3,..]，第一个仓库有5个货物要往下传，第二个仓库汲取所需后有3个要往后传
    let prefix = [], balance = 0;
    for (let i = 0; i < n; i++) {
      balance += arr[i] - target // arr[i] 仓库本来有的， -target后的值为汲取所需后剩下的，+到 balance传给下一个仓库;
      prefix.push(balance);
    }
    const minPrefix = Math.min(...prefix); //获得prefix中最小的值
    // x 是最后一条边 n -> 1 的流量
    const x = -minPrefix;
    let cost = 0;
    // 然后 prefix 中每一个值p都要加上x
    for (const p of prefix) { cost += x + p; }
    return cost;
  }
  const cw = clockwiseCost(products);
  const ccw = clockwiseCost([...products].reverse());
  return Math.min(cw, ccw);
} 