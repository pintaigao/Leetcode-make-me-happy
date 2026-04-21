var longestValidParentheses = function (s) {
  // dp[i] 的定义：记录以 s[i-1] 结尾的最长合法括号子串长度
  // s.length + 1, 思考的时候想一想，我是否需要 index=0 左边的情况（是否需要 dp[0-1=-1]）,在这里需要，因为（（）），最后一个右括号  dp[i] = i - 0 + 1 + dp[0-1=-1];
  // 同时 dp[0]也代表““的情况
  // 如果dp初始化为 s.length,这一条就要改成dp[i] = i - leftIndex + 1 + dp[leftIndex-1]，对于（（）），最后一个右括号  dp[i] = i - 0 + 1 + dp[0-1=-1]，我们有机会看到 index=0 前一位的状态dp[-1]
  let stk = [], dp = new Array(s.length + 1).fill(0);
  for (let i = 0; i < s.length; i++) {
    if (s.charAt(i) === '(') {
      // 遇到左括号，记录索引
      stk.push(i);
      // 左括号不可能是合法括号子串的结尾
      dp[i + 1] = 0;
    } else {
      // 遇到右括号
      if (stk.length > 0) {
        // 配对的左括号对应索引
        let leftIndex = stk.pop();
        // 以这个右括号结尾的最长子串长度
        dp[i + 1] = i - leftIndex + 1 + dp[leftIndex];
      } else {
        // 没有配对的左括号
        dp[i + 1] = 0;
      }
    }
  }
  // 计算最长子串的长度
  return Math.max(...dp);
};

longestValidParentheses("(())");

