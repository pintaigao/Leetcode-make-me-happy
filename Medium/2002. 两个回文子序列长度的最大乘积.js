var maxProduct = function (s) {
  // mask：回文子序列
  let N = s.length, mm = {}, ans = 1;
  const isPalindrome = s => {
    if (!s.length) return false;
    for (let i = 0, j = s.length - 1; i < j; ++i, --j) {
      if (s[i] !== s[j]) return false;
    }
    return true;
  };
  const backtrack = (i, tmp, mask) => {
    // 找到回文子序列
    if (!mm[mask] && isPalindrome(tmp)) mm[mask] = tmp.join("");
    if (i === N) return; // 边界
    tmp.push(s[i]); // 取
    backtrack(i + 1, tmp, mask | (1 << i));
    tmp.pop(); // 不取
    backtrack(i + 1, tmp, mask);
  };
  console.log(mm);

  // 1.回溯找出所有回文子序列
  backtrack(0, [], 0);
  // 2.遍历比对回文串，找出最值
  const mapped = Object.entries(mm), M = mapped.length;
  for (let i = 0; i < M; ++i) {
    for (let j = i + 1; j < M; ++j) {
      if (!(mapped[i][0] & mapped[j][0])) {
        ans = Math.max(ans, mapped[i][1].length * mapped[j][1].length);
      }
    }
  }


  return ans;
};

// maxProduct("leetcodecom")

// 不用 bit manipulate 的方法
var maxProduct2 = function (s) {
  let N = s.length, palindromes = [], ans = 1, used = new Array(N).fill(false);

  const isPalindrome = arr => {
    if (arr.length === 0) return false;
    let left = 0, right = arr.length - 1;
    while (left < right) {
      if (arr[left] !== arr[right]) return false;
      left++;
      right--;
    }

    return true;
  };

  const backtrack = (start, path) => {
    if (isPalindrome(path)) {
      palindromes.push({
        word: path.join(""),
        used: used.slice(), // 重点：一定要复制
      });
    }

    if (start === N) return;

    for (let i = start; i < N; i++) {
      path.push(s[i]);
      used[i] = true;
      backtrack(i + 1, path);
      tmp.pop();
      used[i] = false;
    }

    // // 选择 s[i]
    // path.push(s[start]);
    // used[start] = true;
    // backtrack(start + 1, path, used);

    // // 不选择 s[i]
    // // 撤销选择
    // tmp.pop();
    // used[start] = false;
    // backtrack(start + 1, path, used);
  };

  backtrack(0, []);

  // 思考：当我们获得两个回文字符串，怎么知道他们呢每个字符在 string 中原本的位置呢？
  function hasOverlap(used1, used2) {
    for (let i = 0; i < N; i++) {
      if (used1.used[i] && used2.used[i]) {
        return true;
      }
    }

    return false;
  };

  // palindrome 里面的两个两个比较
  for (let i = 0; i < palindromes.length; i++) {
    for (let j = i + 1; j < palindromes.length; j++) {
      if (!hasOverlap(palindromes[i], palindromes[j])) {
        ans = Math.max(ans, palindromes[i].word.length * palindromes[j].word.length);
      }
    }
  }

  return ans;
};
// maxProduct2("leetcodecom")

// DP 的方法
// 字符串组成第一个 sub string 和 接着字符串组成第二个 substring
var maxProduct3 = function (s) {
  const n = s.length;
  const memo = new Map();

  const isPalindrome = str => {
    if (str.length === 0) return false;

    let left = 0;
    let right = str.length - 1;

    while (left < right) {
      if (str[left] !== str[right]) return false;
      left++;
      right--;
    }

    return true;
  };

  const dfs = (i, str1, str2) => {
    console.log(str1, str2);
    console.log("====");

    const key = i + "|" + str1 + "|" + str2;
    if (memo.has(key)) {
      return memo.get(key);
    }
    if (i === n) {
      if (isPalindrome(str1) && isPalindrome(str2)) {
        return str1.length * str2.length;
      }

      return 0;
    }

    const ch = s[i];

    // choice 1: put s[i] into first subsequence
    const putInFirst = dfs(i + 1, str1 + ch, str2);
    // choice 2: put s[i] into second subsequence
    const putInSecond = dfs(i + 1, str1, str2 + ch);
    // choice 3: skip s[i] // 因为不是一定要使用全部字符
    const skip = dfs(i + 1, str1, str2);

    const best = Math.max(putInFirst, putInSecond, skip);

    // 这个位置 之后的我看过了，记录到这个位置计算到的值
    memo.set(key, best);
    return best;
  };

  return dfs(0, "", "");
};

// maxProduct3("leetcodecom")