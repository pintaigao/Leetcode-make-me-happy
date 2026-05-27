/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */

// 定义一个函数，接受两个数组 A 和 B，返回最小旋转次数或 -1
var minDominoRotations = function (A, B) {
  // 获取数组长度
  // 初始化三个数组，用于统计数字在 A 和 B 中的出现次数以及 A 和 B 中的共同出现次数
  const n = A.length, countA = new Array(7).fill(0), countB = new Array(7).fill(0), sameCount = new Array(7).fill(0);
  // 遍历数组 A 和 B
  for (let i = 0; i < n; i++) {
    // 统计数字在 A 和 B 中的出现次数
    countA[A[i]]++, countB[B[i]]++;
    // 如果 A 和 B 中的数字相同，则增加共同出现次数
    if (A[i] === B[i]) { sameCount[A[i]]++; }
  }

  // 遍历每个可能的数字（1 到 6）
  for (let x = 1; x <= 6; x++) {
    // 检查是否存在一个数字 x，通过旋转数组 A 或 B 后，能够使得数组 A 或 B 中至少一个元素全部为 x
    // 数组 A 或 B 中至少一个元素全部为 x 的原理是：A 中出现 x 的次数 + B 中出现 x 的次数 - A 和 B 中共同出现 x 的次数
    // 假设 A 长度为 5，x 的个数为 3 （需要 2 个 x），B 长度为 5，x 的个数为 4，A，B 中共同出现 x 的个数为 2，那么 A 中需要从 B 中旋转 2 个 x， 如果 A,B中 x 相同的个数为 3，只有 1 个能旋转过来，无法满足条件
    if (countA[x] + countB[x] - sameCount[x] === n) {
      // 满足以上条件，则可以从 A 转到 B 或从 B 转到 A，返回旋转次数，即总长度减去出现次数较少的那个数组的出现次数
      return n - Math.max(countA[x], countB[x]);
    }
  }

  // 不存在这样的 x，返回 -1
  return -1;
};