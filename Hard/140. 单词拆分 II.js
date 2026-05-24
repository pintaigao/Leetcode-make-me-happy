/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  let result = [], path = [], memo = new Set();

  function backtrack(start) {
    if (start == s.length) {
      result.push(path.join(' '));
      return;
    }

    if (start > s.length) return;
    let suffix = s.substring(start);
    if (memo.has(suffix)) {
      return;
    }

    for (let word of wordDict) {
      let len = word.length;
      if (s.substring(start, start + len) === word) {
        path.push(word);
        backtrack(start + len);
        path.pop();
      }
    }
    memo.add(suffix);
  }

  backtrack(0);

  return result;
};

wordBreak("catsanddog", ["cat", "cats", "and", "sand", "dog"]);
wordBreak("pineapplepenapple", ["apple", "pen", "applepen", "pine", "pineapple"]);
wordBreak("catsandog", ["cats", "dog", "sand", "and", "cat"]);

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
      backtrack();
      path.pop();
    }

    memo.add(path.join(''));

  }

  backtrack();
};

wordBreak2("catsanddog", ["cat", "cats", "and", "sand", "dog"]);
