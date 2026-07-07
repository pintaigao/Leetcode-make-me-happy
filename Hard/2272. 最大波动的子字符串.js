// Very Brute Force 的方法
// 因为 substring 是连续的，用双层 loop 更自然：
var largestVariance = function (s) {
  let res = 0;
  const n = s.length;

  for (let start = 0; start < n; start++) {
    const count = new Map();

    for (let end = start; end < n; end++) {
      const ch = s[end];
      count.set(ch, (count.get(ch) || 0) + 1);

      // 至少要有两个不同字符，才有 variance
      if (count.size < 2) continue;

      let maxCount = 0;
      let minCount = Infinity;

      for (const freq of count.values()) {
        maxCount = Math.max(maxCount, freq);
        minCount = Math.min(minCount, freq);
      }

      res = Math.max(res, maxCount - minCount);
    }
  }

  return res;
};

// 固定两个字符 + Kadane
var largestVariance = function (s) {
  let res = 0;

  const chars = new Set(s);

  for (const major of chars) {
    for (const minor of chars) {
      if (major === minor) continue;

      let majorCount = 0;
      let minorCount = 0;

      // 还剩多少个 minor 没看
      let remainingMinor = 0;
      for (const ch of s) {
        if (ch === minor) remainingMinor++;
      }

      for (const ch of s) {
        if (ch === major) {
          majorCount++;
        }

        if (ch === minor) {
          minorCount++;
          remainingMinor--;
        }

        // 必须包含 minor，才可以更新答案
        if (minorCount > 0) {
          res = Math.max(res, majorCount - minorCount);
        }

        // 如果当前 minor 太多，导致差值变负，
        // 并且后面还有 minor 可以用，那就重置
        if (majorCount < minorCount && remainingMinor > 0) {
          majorCount = 0;
          minorCount = 0;
        }
      }
    }
  }

  return res;
};