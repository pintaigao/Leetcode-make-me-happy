/*
 * @lc app=leetcode id=127 lang=javascript
 *
 * [127] Word Ladder
 */

// @lc code=start
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
/* BFS */
var ladderLength = function (beginWord, endWord, wordList) {
  /**
   * 尝试对 word 修改每一个字符，看看是不是能落在 endVisited 中，扩展得到的新的 word 添加到 nextLevelVisited 里
   */
  let changeWordEveryOneLetter = function (currentWord) {
    let charArray = currentWord.split("");
    for (let i = 0; i < endWord.length; i++) {
      // 先保存，然后恢复
      let originChar = charArray[i];
      for (let k = "a".charCodeAt(); k <= "z".charCodeAt(); k++) {
        if (String.fromCodePoint(k) == originChar) {
          continue;
        }
        charArray[i] = String.fromCodePoint(k);
        let nextWord = charArray.join("");

        if (wordSet.has(nextWord)) {
          if (nextWord == endWord) {
            return true;
          }

          if (!visited.has(nextWord)) {
            queue.push(nextWord);
            // 注意：添加到队列以后，必须马上标记为已经访问
            visited.add(nextWord);
          }
        }
      }
      // 原位置恢复
      charArray[i] = originChar;
    }
    return false;
  };

  // 第 1 步：先将 wordList 放到哈希表里，便于判断某个单词是否在 wordList 里
  let wordSet = new Set(wordList);
  if (wordSet.length == 0 || !wordSet.has(endWord)) {
    return 0;
  }
  wordSet.delete(beginWord);

  // 第 2 步：图的广度优先遍历，必须使用队列和表示是否访问过的 visited 哈希表
  let [queue, visited] = [[beginWord], new Set(beginWord)];

  // 第 3 步：开始广度优先遍历，包含起点，因此初始化的时候步数为 1
  let step = 1;
  while (queue.length) {
    let currentSize = queue.length;
    for (let i = 0; i < currentSize; i++) {
      // 依次遍历当前队列中的单词
      let currentWord = queue.shift();
      // 如果 currentWord 能够修改 1 个字符与 endWord 相同，则返回 step + 1
      if (changeWordEveryOneLetter(currentWord)) {
        return step + 1;
      }
    }
    step++;
  }
  return 0;
};

/* Solution 2: 双向广度优先遍历 */
let ladderLength2 = function (beginWord, endWord, wordList) {
  /**
   * 尝试对 word 修改每一个字符，看看是不是能落在 endVisited 中，扩展得到的新的 word 添加到 nextLevelVisited 里
   */
  let changeWordEveryOneLetter = function (word, nextLevelVisited) {
    let charArray = word.split("");
    for (let i = 0; i < word.length; i++) {
      let originChar = charArray[i];
      for (let c = "a".charCodeAt(); c <= "z".charCodeAt(); c++) {
        if (originChar == String.fromCharCode(c)) {
          continue;
        }
        charArray[i] = String.fromCharCode(c);
        let nextWord = charArray.join("");
        if (wordSet.has(nextWord)) {
          // 如果相遇了
          if (endVisited.has(nextWord)) {
            return true;
          }
          if (!visited.has(nextWord)) {
            nextLevelVisited.add(nextWord);
            console.log(nextLevelVisited);
            visited.add(nextWord);
          }
        }
      }
      // 恢复，下次再用
      charArray[i] = originChar;
    }
    return false;
  };

  // 第 1 步：先将 wordList 放到哈希表里，便于判断某个单词是否在 wordList 里
  let wordSet = new Set(wordList);
  if (wordSet.length == 0 || !wordSet.has(endWord)) {
    return 0;
  }

  // 第 2 步：已经访问过的 word 添加到 visited 哈希表里
  // 分别用左边和右边扩散的哈希表代替单向 BFS 里的队列，它们在双向 BFS 的过程中交替使用
  let [visited, beginVisited, endVisited] = [new Set(), new Set([beginWord]), new Set([endWord])];

  // 第 3 步：执行双向 BFS，左右交替扩散的步数之和为所求
  let step = 1;
  while (beginVisited.size && endVisited.size) {
    // 优先选择小的哈希表进行扩散，考虑到的情况更少
    if (beginVisited.length > endVisited.length) {
      let temp = beginVisited;
      beginVisited = endVisited;
      endVisited = temp;
    }

    // 逻辑到这里，保证 beginVisited 是相对较小的集合，nextLevelVisited 在扩散完成以后，会成为新的 beginVisited
    let nextLevelVisited = new Set();
    for (let word of beginVisited) {
      if (changeWordEveryOneLetter(word, nextLevelVisited)) {
        return step + 1;
      }
    }

    // 原来的 beginVisited 废弃，从 nextLevelVisited 开始新的双向 BFS
    beginVisited = nextLevelVisited;
    step++;
  }

  return 0;
};

ladderLength2("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]);
// @lc code=end
