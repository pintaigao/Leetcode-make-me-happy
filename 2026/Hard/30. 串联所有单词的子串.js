// 练习
var findSubstring10 = function (s, words) {
  // 1. 用 map 记录words对应个数，
  let wordsCountMap = {}, windowSize = words[0].length * words.length, result = [];
  words.forEach((word) => wordsCountMap[word] = (wordsCountMap[word] || 0) + 1);

  // 2. 滑窗，窗内维护逻辑
  for (let start = 0; start < words[0].length; start++) {
    let currentMap = {}, unMatchWords = 0;
    for (let i = start; i < s.length; i = i + words[0].length) {
      // 0. 提取单词
      let word = s.substring(i, i + words[0].length);

      // 1. 统计这个已经准备好了的区间内，这个单词出现的次数
      currentMap[word] = (currentMap[word] || 0) + 1;
      if (!wordsCountMap[word] || (wordsCountMap[word] && currentMap[word] > wordsCountMap[word])) {
        unMatchWords += 1;
      }

      // 2. 看结果
      if (i + words[0].length - windowSize < 0) {
        continue;
      }

      if (unMatchWords == 0) {
        result.push(i + words[0].length - windowSize);
      }

      // 3. 缩窗口
      let leftWordIndex = i + words[0].length - windowSize, leftWord = s.substring(leftWordIndex, leftWordIndex + words[0].length);
      if (!wordsCountMap[leftWord] || (wordsCountMap[leftWord] && currentMap[leftWord] > wordsCountMap[leftWord])) {
        unMatchWords -= 1;
      }

      currentMap[leftWord] -= 1;
    }
  }

  return result
};


findSubstring10('barfoofoobarthefoobarman', ["foo", "bar", "the"])
