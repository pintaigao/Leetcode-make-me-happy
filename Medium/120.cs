public class Solution {
  public int MinimumTotal(IList<IList<int>> triangle) {
    int n = triangle.Count;
    // int[][] dp = new int[n][n]; 不可以这样写
    int[][] dp = new int[n][];

    for (int i = 0; i < n; i++) {
      dp[i] = new int[n];

      for (int j = 0; j < n; j++) {
        dp[i][j] = int.MaxValue;
      }
    }

    // 以上还可以这么写
    // int[,] dp = new int[n, n];
    // for (int i = 0; i < n; i++) {
    //   for (int j = 0; j < n; j++) {
    //     dp[i, j] = int.MaxValue;
    //   }
    // }

    dp[0][0] = triangle[0][0];

    for (int i = 1; i < n; i++) {
      for (int j = 0; j < triangle[i].Count; j++) {
        if (j == 0) {
          dp[i][j] = dp[i - 1][j] + triangle[i][j];
        }
        else if (j == i) {
          dp[i][j] = dp[i - 1][j - 1] + triangle[i][j];
        }
        else {
          dp[i][j] = Math.Min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j];
        }
      }
    }

    int res = int.MaxValue;

    for (int j = 0; j < n; j++) {
      res = Math.Min(res, dp[n - 1][j]);
    }

    return res;
  }
}