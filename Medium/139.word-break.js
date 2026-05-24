/*
 * @lc app=leetcode id=139 lang=javascript
 *
 * [139] Word Break
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 *
 */

/* DFS 1：*/
var wordBreak = function (s, wordDict) {
  let len = s.length;

  const canBreak = (start) => {
    // 判断从start到末尾的子串能否break
    if (start == len) {
      //指针越界，s一步步成功划分为单词，才走到越界这步，现在没有剩余子串
      return true; //返回真，结束递归
    }
    for (let i = start + 1; i <= len; i++) {
      //指针i去划分两部分，for枚举出当前所有的选项i
      const prefix = s.slice(start, i); // 切出的前缀部分
      // canBreak 是一个递归函数，判断从i到末尾的子串能否break。只有前缀部分是单词，且递归看剩余子串能break，才返回真
      if (wordDict.indexOf(prefix) !== -1 && canBreak(i)) {
        // 前缀部分是单词，且剩余子串能break，返回真
        return true;
      } // 如果前缀部分不是单词，就不会执行canBreak(i)。进入下一轮迭代，再切出一个前缀串，再试
    }
    return false; // 指针i怎么划分，都没有返回true，则返回false
  };

  return canBreak(0); // 递归的入口，从0到末尾的子串能否break
};

/* DFS 记忆化 */
const wordBreak2 = (s, wordDict) => {
  let len = s.length, wordSet = new Set(wordDict), memo = new Array(len);

  const canBreak = (start) => {
    if (start == len) return true;
    if (memo[start] !== undefined) return memo[start]; // memo中有，就用memo中的

    for (let i = start + 1; i <= len; i++) {
      const prefix = s.slice(start, i);
      if (wordSet.has(prefix) && canBreak(i)) {
        memo[start] = true; // 当前递归的结果存一下
        return true;
      }
    }

    memo[start] = false; // 当前递归的结果存一下
    return false;
  };
  return canBreak(0);
};

/* BFS */
const wordBreak3 = (s, wordDict) => {
  let wordSet = new Set(wordDict), len = s.length, queue = [0];

  while (queue.length) {
    const start = queue.shift(); // 考察出列的指针
    for (let i = start + 1; i <= len; i++) {
      // i指针去划分两部分
      const prefix = s.slice(start, i); // 切出前缀部分
      if (wordSet.has(prefix)) {
        // 前缀部分是单词
        if (i < len) {
          // i还没越界，还能继续划分，让它入列，作为下一层待考察的节点
          queue.push(i);
        } else {
          // i==len，指针越界，说明s串一路被切出单词，现在没有剩余子串，返回true
          return true;
        }
      } // 前缀部分不是单词，这个 i 指针不入列，继续下轮迭代，切出下一个前缀部分，再试
    }
  }
  return false; // BFS完所有节点（考察了所有划分的可能）都没返回true，则返回false
};

/* 优化后的BFS */
const wordBreak4 = (s, wordDict) => {
  const wordSet = new Set(wordDict);
  const len = s.length;
  const visited = new Array(len);

  const queue = [];
  queue.push(0);

  while (queue.length) {
    const start = queue.shift(); // 考察出列的指针
    if (visited[start]) continue; // 是访问过的，跳过
    visited[start] = true; // 未访问过的，记录一下

    for (let i = start + 1; i <= len; i++) {
      // 用指针i去划分两部分
      const prefix = s.slice(start, i); // 前缀部分
      if (wordSet.has(prefix)) {
        // 前缀部分是单词
        if (i < len) {
          // i还没越界，还能继续划分，让它入列，作为下一层待考察的节点
          queue.push(i);
        } else {
          // i==len，指针越界，说明s串一路被切出单词，现在没有剩余子串，不用划分，返回true
          return true;
        }
      } // 前缀部分不是单词，i指针不入列，继续下轮迭代，切出下一个前缀部分，再试
    }
  }
  return false; // BFS完所有节点（考察了所有划分的可能）都没返回true，则返回false
};

/* DP */
const wordBreak5 = (s, wordDict) => {
  let wordSet = new Set(wordDict), dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i <= s.length; i++) {
    console.log(i);
    for (let j = i - 1; j >= 0; j--) {
      // j去划分成两部分
      const suffix = s.substring(j, i); // 后缀部分 s[j: i-1]
      console.log(suffix);

      // 如果 wordDict 中存在suffix，且左侧子串[0, j-1]的 dp[j] 为真，说明 s[0..j-1] 可以被拆成单词，s[j..i-1] 是单词，那么 s[0..i-1] 也可以被拆成单词
      // j 既可以代表单词的开头，也可以代表 dp[j] => s[0..j-1] 是不是在wordDict中有
      if (wordSet.has(suffix) && dp[j]) {
        // 后缀部分是单词，且左侧子串[0,j-1]的dp[j]为真
        // dp[i] = true 代表 s[0..i-1] 可以被拆成单词
        dp[i] = true;
        break; // dp[i] = true了，i长度的子串已经可以拆成单词了，不需要j继续划分子串了
      }
    }

    console.log(dp);
    console.log("====");

  }
  return dp[s.length];
};

wordBreak5('catsandog', ["og", "sand", "and", "cat", "cats"]);

// @lc code=end

// 遍历的思路（回溯解法）
var wordBreak6 = function (s, wordDict) {
  let found = false, track = [];

  function backtrack(start) {
    // base case
    if (found) {
      // 如果已经找到答案，就不要再递归搜索了
      return;
    }
    if (start == s.length) {
      // 整个 s 都被匹配完成，找到一个合法答案
      found = true;
      return;
    }
    // 回溯算法框架(有计划的前缀前缀的看，而不是无脑的枚举)
    for (let word of wordDict) {
      // 看看哪个单词能够匹配 s[start..] 的前缀
      let len = word.length;
      if (start + len <= s.length && s.substring(start, start + len) == word) {
        // 找到一个单词匹配 s[start..start+len)
        // 做选择
        track.push(word);
        // 进入回溯树的下一层，继续匹配 s[start+len..]
        backtrack(start + len);
        // 撤销选择
        track.pop();
      }
    }
  }

  backtrack(0);
  return found;
};


// 带备忘录的回溯解法
var wordBreak = function (s, wordDict) {
  // 备忘录，存储不能切分的子串（子树），从而避免重复计算
  let memo = new Set(), found = false, track = [];

  function backtrack(start) {
    if (found) {
      return;
    }
    if (start == s.length) {
      found = true;
      return;
    }

    // 新增的剪枝逻辑，查询子串（子树）是否已经计算过
    let suffix = s.substring(start);
    if (memo.has(suffix)) {
      // 当前子串（子树）不能被切分，就不用继续递归了
      return;
    }

    for (let word of wordDict) {
      // 看看哪个单词能够匹配 s[start..] 的前缀
      let len = word.length;
      if (start + len <= s.length && s.substring(start, start + len) == word) {
        // 找到一个单词匹配 s[start..start+len)
        // 做选择
        track.push(word);
        // 进入回溯树的下一层，继续匹配 s[start+len..]
        backtrack(start + len);
        // 撤销选择
        track.pop();
      }
    }

    // 后序位置，将不能切分的子串（子树）记录到备忘录，不管有没有 found，说明这个子串（子树）
    memo.add(suffix);
  }

  backtrack(0);
  return found;
};

// 动态规划解法
// 现在我们换一种视角，思考一下是否能够把原问题分解成规模更小，结构相同的子问题，然后通过子问题的结果计算原问题的结果
// 对于输入的字符串 s，如果我能够从单词列表 wordDict 中找到一个单词匹配 s 的前缀 s[0..k]，那么只要我能拼出 s[k+1..]，就一定能拼出整个 s。换句话说，我把规模较大的原问题 wordBreak(s[0..]) 分解成了规模较小的子问题 wordBreak(s[k+1..])，然后通过子问题的解反推出原问题的解
var wordBreak7 = function (s, wordDict) {
  // 用哈希集合方便快速判断是否存在
  let wordSet = new Set(wordDict);
  // 备忘录，-1 代表未计算，0 代表无法凑出，1 代表可以凑出
  let memo = Array(s.length).fill(-1);

  // 主函数
  function dp(i) {
    // base case
    if (i == s.length) return true;
    // 防止冗余计算
    if (memo[i] !== -1) return memo[i] == 0 ? false : true;

    // 遍历 s[i..] 的所有前缀
    for (let j = i + 1; j <= s.length; j++) {
      // 看看哪些前缀存在 wordDict 中
      let prefix = s.substring(i, j);
      if (wordSet.has(prefix)) {
        // 找到一个单词匹配 s[i..j)
        // 只要 s[j..] 可以被拼出，s[i..] 就能被拼出
        if (dp(j)) {
          memo[i] = 1;
          return true;
        }
      }
    }

    // s[i..] 无法被拼出
    memo[i] = 0;
    return false;
  }

  return dp(0);
};