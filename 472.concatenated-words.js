/*
 * @lc app=leetcode id=472 lang=javascript
 *
 * [472] Concatenated Words
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string[]}
 */

/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function (words) {
  const root = new Trie(),
    ans = new Array();
  words.sort((a, b) => a.length - b.length);
  for (const word of words) {
    if (word.length == 0) continue;
    if (root.find(root, word)) ans.push(word);
    else root.insert(word);
  }
  return ans;
};

class Trie {
  constructor() {
    this.children = new Array(26);
    this.isEnd = false;
  }

  insert(word) {
    let node = this;
    for (let i = 0; i < word.length; i++) {
      const idx = word.charCodeAt(i) - "a".charCodeAt(0);
      if (node.children[idx] === undefined) node.children[idx] = new Trie();
      node = node.children[idx];
    }
    node.isEnd = true;
  }

  find(root, word) {
    let node = root;
    for (let i = 0; i < word.length; i++) {
      if (node.isEnd) if (this.find(root, word.substring(i, word.length))) return true;
      const idx = word.charCodeAt(i) - "a".charCodeAt(0);
      if (node.children[idx] === undefined) return false;
      node = node.children[idx];
    }
    return node.isEnd;
  }
}

/* HashSet的做法 */
var findAllConcatenatedWordsInADict = function (words) {
  const dict = new Set(words);
  const isConcat = (word) => {
    for (let i = 1; i < word.length; i++) {
      let prefix = word.substring(0, i);
      if (dict.has(prefix)) {
        let suffix = word.substring(i);
        if (dict.has(suffix)) {
          return true;
        }
        let result = isConcat(suffix);
        if (result) {
          return true;
        }
      }
    }
    return false;
  };
  const results = [];
  for (const word of words) {
    // dict.delete(word);
    if (isConcat(word)) results.push(word);
    // dict.add(word);
  }
  return results;
};

// @lc code=end
