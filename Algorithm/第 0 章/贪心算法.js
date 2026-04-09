// 定义：做 n 次选择，返回可以获得的最大金额
int findMax(int n) {
  if (n == 0) return 0;

    // 这次选择 1 元，然后递归求解剩下的 n - 1 次选择的最大值
    int result1 = 1 + findMax(n - 1);
    // 这次选择 100 元，然后递归求解剩下的 n - 1 次选择的最大值
    int result2 = 100 + findMax(n - 1);

  // 返回两种选择中的最大值
  return Math.max(result1, result2);
}

// 优化一、没必要对两种选择进行比较了
int findMax(int n) {
  if (n == 0) return 0;
    int result = 100 + findMax(n - 1);
  return result;
}

// 优化二、递归改为迭代
int findMax(int n) {
    int result = 0;
  for (int i = 0; i < n; i++) {
    result += 100;
  }
  return result;
}

// 优化三、直接计算结果就行了
int findMax(int n) {
  return 100 * n;
}