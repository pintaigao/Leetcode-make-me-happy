// 1. 一个 BFS 从 startWord 开始，逐步尝试修改每个字符，寻找最短的转换序列
var ladderLength = function (beginWord, endWord, wordList) {
  // 将 wordList 转换为 HashSet，加速查找
  let wordSet = new Set(wordList), q = [beginWord], visited = new Set([beginWord]), step = 1;
  if (!wordSet.has(endWord)) { return 0; }
  wordSet.delete(beginWord);

  while (q.length > 0) {
    let sz = q.length;
    for (let i = 0; i < sz; ++i) {
      // 穷举 curWord 修改一个字符能得到的单词
      // 即对每个字符，穷举 26 个字母
      let chars = q.shift().split('');
      // 开始穷举每一位字符 curWord[j]
      for (let j = 0; j < chars.length; ++j) {
        let originChar = chars[j];
        // 对每一位穷举 26 个字母
        for (let c = 97; c <= 122; ++c) { // 'a' = 97, 'z' = 122
          if (String.fromCharCode(c) === originChar) continue;
          chars[j] = String.fromCharCode(c);
          // 如果构成的新单词在 wordSet 中，就是找到了一个可行的下一步
          let newWord = chars.join('');
          if (wordSet.has(newWord) && !visited.has(newWord)) {
            if (newWord === endWord) {
              return step + 1;
            }
            q.push(newWord);
            visited.add(newWord);
          }
        }
        // 最后别忘了把 curWord[j] 恢复
        chars[j] = originChar;
      }
    }
    // 这里增加步数
    ++step;
  }
  return 0;
};

// 2. 双向 BFS，从 beginWord 和 endWord 同时开始，逐步逼近，通常比单向 BFS 更快
var ladderLength = function (beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);

  if (!wordSet.has(endWord)) return 0;

  let beginSet = new Set([beginWord]), endSet = new Set([endWord]);

  let step = 1;
  const L = beginWord.length;

  while (beginSet.size > 0 && endSet.size > 0) {
    // always expand the smaller frontier
    if (beginSet.size > endSet.size) {
      const temp = beginSet;
      beginSet = endSet;
      endSet = temp;
    }

    const nextSet = new Set();

    for (const word of beginSet) {
      for (let i = 0; i < L; i++) {
        for (let c = 97; c <= 122; c++) {
          const ch = String.fromCharCode(c);

          if (ch === word[i]) continue;

          const nextWord =
            word.slice(0, i) + ch + word.slice(i + 1);

          // if the other side already has this word, path is found
          if (endSet.has(nextWord)) {
            return step + 1;
          }

          if (wordSet.has(nextWord)) {
            nextSet.add(nextWord);
            wordSet.delete(nextWord);
          }
        }
      }
    }

    beginSet = nextSet;
    step++;
  }

  return 0;
};