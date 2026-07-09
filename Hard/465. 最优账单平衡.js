/**
 * @param {number[][]} transactions
 * @return {number}
 */
var minTransfers = function (transactions) {
  let balance = new Map(), debts = []

  // 1. Calculate net balance for each person
  for (const [from, to, amount] of transactions) {
    balance.set(from, (balance.get(from) || 0) - amount);
    balance.set(to, (balance.get(to) || 0) + amount);
  }

  // 2. Only keep non-zero balances
  for (const val of balance.values()) {
    if (val !== 0) { debts.push(val); }
  }

  function dfs(start) {
    // Skip settled people
    while (start < debts.length && debts[start] === 0) { start++; }
    // Everyone is settled 已经没人需要结算了，还需要 0 笔交易。
    if (start === debts.length) { return 0; }
    let min = Infinity;

    for (let i = start + 1; i < debts.length; i++) {
      // Only settle opposite signs
      if (debts[start] * debts[i] < 0) {
        // Try settling start with i
        // 用 i 来帮助处理掉 start，然后把剩余问题留在 i 身上
        debts[i] += debts[start];

        min = Math.min(min, 1 + dfs(start + 1));

        // Backtrack
        debts[i] -= debts[start];
      }
    }

    return min;
  }

  return dfs(0);
};


minTransfers([[0, 1, 10], [2, 0, 5]]);