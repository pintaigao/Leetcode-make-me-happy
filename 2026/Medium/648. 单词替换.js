/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
  const dictionarySet = new Set(), words = sentence.split(" ");
  for (const root of dictionary) {
    dictionarySet.add(root);
  }
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    for (let j = 0; j < word.length; j++) {
      if (dictionarySet.has(word.substring(0, 1 + j))) {
        words[i] = word.substring(0, 1 + j);
        break;
      }
    }
  }
  return words.join(' ');
};

// Trie 解法
var replaceWords = function (dictionary, sentence) {
  //先将字典中的单词加入trie树
  const root = {}
  for (let word of dictionary) {
    let node = root
    for (let c of word) {
      if (!node[c]) {
        node[c] = {}
      }
      node = node[c]
    }
    node.isEnd = true
  }
  //将句子变为数组
  const words = sentence.split(' ')
  const res = []//保存结果
  //去trie树种查找句子种的单词，遇到found=true,替换，如果没找到，直接加入结果
  for (let word of words) {
    let replace = ''
    let found = false
    let node = root
    for (let c of word) {
      if (node[c]) {
        replace += c
        node = node[c]
        if (node.isEnd) {
          found = true
          break;
        }
      } else {
        break
      }
    }
    res.push(found ? replace : word)
  }
  return res.join(' ')
};