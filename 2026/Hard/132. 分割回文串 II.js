/**
 * @param {string} s
 * @return {number}
 */
var minCut = function (s) {
  let stringCharArray = s.split(""), combinationArray = [], combinationSet = [], minCutResult = Number.MAX_VALUE;

  function isPalindrome(start, end) {
    while (start < end) {
      if (stringCharArray[start] !== stringCharArray[end]) {
        return false;
      }
      start += 1, end -= 1;
    }

    return true;
  }

  function combination(start) {
    if (start === stringCharArray.length) {
      combinationSet.push(combinationArray.slice());
    }

    for (let i = start; i < stringCharArray.length; i++) {
      if (isPalindrome(start, i)) {
        combinationArray.push(stringCharArray.slice(start, i + 1).join(""));
        combination(i + 1);
        combinationArray.pop();
      }
    }
  }

  combination(0);

  console.log(combinationSet);

  combinationSet.forEach(r => { minCutResult = Math.min(minCutResult, r.length - 1) });

  return minCutResult;
}

// DP
var minCut10 = function (s) {
  const n = s.length, isPali = new Array(n).fill(0).map(() => new Array(n)), dp = Array.from({ length: n }, ((_, index) => index));

  for (let j = 0; j < s.length; j++) {
    for (let i = 0; i <= j; i++) {
      // 如果i == j时，子串只有一个字符，肯定回文
      // j-i == 1时，子串由两个字符组成，字符必须相同s[i] == s[j]
      // j-i > 1时，子串由两个以上字符组成，s[i] == s[j]，且dp[i+1][j-1]=true即除去首尾字符的剩余子串也是回文子串。
      if (i == j || (j - i == 1 && s[i] == s[j]) || (j - i > 1 && s[i] == s[j] && isPali[i + 1][j - 1])) {
        isPali[i][j] = true;
      } else {
        isPali[i][j] = false;
      }
    }
  }

  console.log();


  for (let i = 0; i < n; i++) {
    // dp[i] ：索引 0 到 i 的子串 [0,i] 的最小分割数
    // 如果从头到尾都是回文，则没有位置可以分割 dp[i] = 0;
    if (isPali[0][i]) {
      dp[i] = 0;
      continue;
    }
    // dp[i] 表示 [0,i] 的最小分割数，我们用指针 j 去切分一下 [0,i]，切一个规模小一点的 dp 子问题出来。
    // 分成了两部分：[0, j] 和[j + 1, i]，其中[0, j] 的最小分割数是 dp[j]，它相对于 dp[i] 是计算过的状态，我们要找出 dp[i] 和 dp[j] 的递推关系。
    // 对于[j + 1, i]，如果它是回文串，就有递推关系：dp[i] = dp[j] + 1
    // 因为 j 指针是在扫[0, i]，j 在变，它切的[j + 1, i] 如果多次是回文串，dp[i] 取最小的 dp[j] + 1 就好
    for (let j = 0; j < i; j++) {
      if (isPali[j + 1][i]) {
        dp[i] = Math.min(dp[i], dp[j] + 1);
      }
    }
  }
  return dp[n - 1];
};

// Exapnd 的方法
var minCut11 = function (s) {
  // 
  const n = s.length, cuts = Array.from({ length: n }, (_, i) => i)

  const expand = (left, right) => {
    while (left >= 0 && right < n && s[left] === s[right]) {
      const newCut = left === 0 ? 0 : cuts[left - 1] + 1
      if (newCut < cuts[right]) cuts[right] = newCut;
      left--;
      right++;
    }
  }

  for (let center = 0; center < n; center++) {
    expand(center, center);
    expand(center, center + 1);
  }

  return cuts[n - 1];
}