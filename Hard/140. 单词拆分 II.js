/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  let result = [], path = [];

  function backtrack(start) {
    if (start == s.length) {
      result.push(path.join(' '));
      return;
    }

    if (start > s.length) return;

    for (let word of wordDict) {
      let len = word.length;
      if (s.substring(start, start + len) === word) {
        path.push(word);
        backtrack(start + len);
        path.pop();
      }
    }
  }

  backtrack(0);

  return result;
};

// wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]);
// wordBreak("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]);
// wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]);

var wordBreak3 = function (s, wordDict) {
  const wordSet = new Set(wordDict), memo = new Map();

  function dfs(start) {
    if (memo.has(start)) { return memo.get(start); }
    if (start === s.length) { return [""]; }

    const res = [];

    for (let end = start + 1; end <= s.length; end++) {
      const word = s.slice(start, end);

      if (wordSet.has(word)) {
        const nextSentences = dfs(end);

        for (const sentence of nextSentences) {
          if (sentence === "") {
            res.push(word);
          } else {
            res.push(word + " " + sentence);
          }
        }
      }
    }

    memo.set(start, res);
    return res;
  }

  return dfs(0);
};

// 练习

var wordBreak2 = function (s, wordDict) {
  let result = [], path = [], memo = new Set();

  function backtrack() {
    if (path.join('').length === s.length) {
      result.push(path.join(''));
      return;
    }


    if (path.join('').length > s.length) return;

    if (memo.has(path.join(''))) {
      return;
    }

    for (let i = 0; i < wordDict.length; i++) {
      path.push(wordDict[i]);
      console.log(path);
      backtrack();
      path.pop();
    }

    memo.add(path.join(''));
  }


  backtrack();
};

wordBreak2("catsanddog", ["cat", "cats", "and", "sand", "dog"]);
