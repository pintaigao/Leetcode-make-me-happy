function solution(S, K) {
  const wordSets = [], allLetters = new Set();

  // 1. 每个字符串转成去重字母集合
  for (const word of S) {
    const letterSet = new Set(word);

    // 如果一个字符串本身就超过 K 种不同字母，那不可能被构造
    if (letterSet.size <= K) {
      wordSets.push(letterSet);
      for (const ch of letterSet) {
        allLetters.add(ch);
      }
    }
  }

  const letters = [...allLetters], ans = 0, chosen = new Set();

  function countBuildable() {
    let count = 0;

    for (const set of wordSets) {
      let canBuild = true;

      for (const ch of set) {
        if (!chosen.has(ch)) {
          canBuild = false;
          break;
        }
      }

      if (canBuild) count++;
    }

    return count;
  }

  // 2. 回溯枚举最多 K 个字母
  function dfs(index) {
    // 题目是 at most K，所以每次都可以计算
    ans = Math.max(ans, countBuildable());

    if (chosen.size === K || index === letters.length) {
      return;
    }

    // 选当前字母
    chosen.add(letters[index]);
    dfs(index + 1);

    // 不选当前字母
    chosen.delete(letters[index]);
    dfs(index + 1);
  }

  dfs(0);
  return ans;
}