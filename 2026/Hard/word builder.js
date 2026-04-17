
function solution(S, K) {
  let wordSets = [], letters = [], ans = 0, selectedLetters = new Set();

  // 过滤掉字母种类数大于 K 的单词
  // In preprocessing, I convert each word into an array of unique letters.
  // I only keep words whose unique - letter count is at most K.
  // At the same time, I build the pool of candidate letters from those words.

  for (const word of S) {
    const letterSet = new Set(word);

    if (letterSet.size <= K) {
      wordSets.push([...letterSet]);
      // 将单词中的字母加入到 letters 数组中
      // 获取所有单词中出现的字母，并去重
      // After preprocessing, I deduplicate the candidate letters, because each distinct letter only needs to be considered once in the search.
      letters = [...new Set([...letters, ...letterSet])];
    }
  }

  // For a given selected-letter set, I scan all valid words and check whether every required letter of that word is contained in the selected set.If yes, that word is buildable.
  // Since I only care about the count, I just accumulate how many words are covered.
  function checkWord() {
    let count = 0;
    for (const letterSet of wordSets) {
      let flag = true;

      // 检查当前单词的所有字母是否都在 selectedLetters 中
      for (const char of letterSet) {
        if (!selectedLetters.has(char)) {
          flag = false;
          break;
        }
      }

      // 如果当前单词的所有字母都在 selectedLetters 中，则计数加 1
      if (flag) count += 1;
    }

    return count;
  }

  // Check combinations of letters using backtracking, 检查 combinations of letters 最多能够组成多少个单词
  function backtracking(index) {
    ans = Math.max(ans, checkWord());

    if (selectedLetters.size === K || index === letters.length) return;

    // 选择当前字母
    // In backtracking, before branching, I evaluate the current choice and update the global maximum, because the problem asks for “at most K letters”, not exactly K.
    // Then I branch into two cases:
    // pick the current letter, or skip it.
    selectedLetters.add(letters[index]);
    backtracking(index + 1);

    // 不选择当前字母
    selectedLetters.delete(letters[index]);
    backtracking(index + 1);

  }

  // Backtracking For Loop的写法
  function backtrack(start) {
    ans = Math.max(ans, checkWord());

    if (selectedLetters.size === K) return;

    for (let i = start; i < letters.length; i++) {
      selectedLetters.add(letters[i]);
      backtrack(i + 1);
      selectedLetters.delete(letters[i]);
    }
  }


  backtracking(0);
  return ans;
}

solution(["bc", "edf", "fde", "dge", "abcd"], 4);