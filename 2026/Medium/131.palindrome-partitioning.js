/*
 * @lc app=leetcode id=131 lang=javascript
 *
 * [131] Palindrome Partitioning
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */

/* 1. 回溯 + 动态规划预处理*/
var partition = function (s) {
  const dfs = (i) => {
    if (i === s.length) {
      ret.push(ans.slice());
      return;
    }
    for (let j = i; j < s.length; ++j) {
      if (f[i][j]) {
        ans.push(s.slice(i, j + 1));
        dfs(j + 1);
        ans.pop();
      }
    }
  };

  const f = new Array(s.length).fill(0).map(() => new Array(s.length).fill(true));
  let [ret, ans] = [[], []];

  for (let i = s.length - 1; i >= 0; --i) {
    for (let j = i + 1; j < s.length; ++j) {
      f[i][j] = s[i] === s[j] && f[i + 1][j - 1];
    }
  }

  dfs(0);
  return ret;
};

/* 2.记忆化搜索 */
let partition2 = function (s) {
  const dfs = (i) => {
    if (i === s.length) {
      ret.push(ans.slice());
      return;
    }
    for (let j = i; j < s.length; ++j) {
      if (isPalindrome(i, j) === 1) {
        ans.push(s.slice(i, j + 1));
        dfs(j + 1);
        ans.pop();
      }
    }
  };

  // 记忆化搜索中，f[i][j] = 0 表示未搜索，1 表示是回文串，-1 表示不是回文串, i 代表头，j代表尾，i-1, j+1即中间
  const isPalindrome = (i, j) => {
    if (f[i][j] !== 0) {
      return f[i][j];
    }
    if (i >= j) {
      f[i][j] = 1;
    } else if (s[i] === s[j]) {
      f[i][j] = isPalindrome(i + 1, j - 1);
    } else {
      f[i][j] = -1;
    }
    return f[i][j];
  };

  const [ret, ans] = [[], []];
  const f = new Array(s.length).fill(0).map(() => new Array(s.length).fill(0));

  dfs(0);
  return ret;
};

partition("aab");
// @lc code=end

var partition10 = function (s) {
  let sArray = s.split(""), combinationSet = [], result = [], memo = new Array(s.length).fill(0).map(() => new Array(s.length)); // 记忆化start,end之间是不是回文[start][end] = true/false

  function isPalindrome(start, end) {
    while (start < end) {
      if (sArray[start] !== sArray[end]) {
        memo[start][end] = false;
        return false
      }

      start += 1;
      end -= 1;
    }

    memo[start][end] = true;
    return true;
  }

  function combination(start) {
    if (start === sArray.length) {
      result.push(combinationSet.slice());
    }

    for (let i = start; i < sArray.length; i++) {
      if (memo[start][i] || isPalindrome(start, i)) {
        combinationSet.push(sArray.slice(start, i + 1).join(""))
        combination(i + 1);
        combinationSet.pop();
      }
    }
    console.log(combinationSet);
  }

  combination(0);

  return result;
}

// 动态规划 从头到尾
var partition11 = function (s) {
  let res = [], dp = new Array(s.length).fill(0).map(() => new Array(s.length));
  // 从头开始
  // 先保持尾不变
  for (let j = 0; j < s.length; j++) {
    // 然后从头遍历到尾
    for (let i = 0; i <= j; i++) {
      // 如果i == j时，子串只有一个字符，肯定回文
      // j-i == 1时，子串由两个字符组成，字符必须相同s[i] == s[j]
      // j-i > 1时，子串由两个以上字符组成，s[i] == s[j]，且dp[i+1][j-1]=true即除去首尾字符的剩余子串也是回文子串。
      if (i == j || (j - i == 1 && s[i] == s[j]) || (j - i > 1 && s[i] == s[j] && dp[i + 1][j - 1])) {
        dp[i][j] = true;
      } else {
        dp[i][j] = false;
      }
    }
  }
  function dfs(temp, start) {
    if (start == s.length) {
      res.push(temp.slice());
      return;
    }
    for (let i = start; i < s.length; i++) {
      if (dp[start][i]) {
        temp.push(s.substring(start, i + 1));
        dfs(temp, i + 1);
        temp.pop();

        // 或者
        // dfs([...temp, s.substring(start, i + 1)], i + 1);
      }
    }
  }
  dfs([], 0);
  return res;
};

partition11("aab")

// 动态规划 从尾到头
var partition12 = function (s) {
  let res = [], dp = new Array(s.length).fill(0).map(() => new Array(s.length));
  // 从尾开始
  // 先保持头不变
  for (let i = s.length - 1; i >= 0; i--) {
    // 然后从头遍历到尾
    for (let j = i; j < s.length; j++) {
      // 如果i == j时，子串只有一个字符，肯定回文
      // j-i == 1时，子串由两个字符组成，字符必须相同s[i] == s[j]
      // j-i > 1时，子串由两个以上字符组成，s[i] == s[j]，且dp[i+1][j-1]=true即除去首尾字符的剩余子串也是回文子串。
      if (i == j || (j - i == 1 && s[i] == s[j]) || (j - i > 1 && s[i] == s[j] && dp[i + 1][j - 1])) {
        dp[i][j] = true;
      } else {
        dp[i][j] = false;
      }
    }
  }
  function dfs(temp, start) {
    if (start == s.length) {
      res.push(temp.slice());
      return;
    }
    for (let i = start; i < s.length; i++) {
      if (dp[start][i]) {
        temp.push(s.substring(start, i + 1));
        dfs(temp, i + 1);
        temp.pop();

        // 或者
        // dfs([...temp, s.substring(start, i + 1)], i + 1);
      }
    }
  }
  dfs([], 0);
  return res;
};
