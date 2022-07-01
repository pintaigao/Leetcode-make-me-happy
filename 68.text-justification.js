/*
 * @lc app=leetcode id=68 lang=javascript
 *
 * [68] Text Justification
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {number} maxWidth
 * @return {string[]}
 */
var fullJustify = function (words, maxWidth) {
  let res = [];
  let [count, begin] = [0, 0];

  /**
   * 对每行单词进行空格平均划分
   */
  let fillWords = function (begin, end) {
    // 有多少个单词
    let wordCount = end - begin + 1;
    let spaceCount = maxWidth;
    for (let i = begin; i <= end; i++) {
      // 除去所有单词的长度 + 除去每个单词尾部空格， + 1 是最后一个单词的尾部空格的特殊处理
      spaceCount -= words[i].length + 1;
    }
    spaceCount += 1;
    // 词尾空格
    let spaceSuffix = 1;
    // 额外空格的平均值 = 总空格数/间隙数
    let spaceAvg = wordCount == 1 ? 1 : parseInt(spaceCount / (wordCount - 1));
    // 额外空格的余数
    let spaceExtra = wordCount == 1 ? 0 : spaceCount % (wordCount - 1);
    // 填入单词
    let sb = [];
    for (let i = begin; i < end; i++) {
      sb.push(words[i]);
      // 如果是最后一行
      if (end == words.length - 1) {
        sb.push(" ");
        continue;
      }

      let n = spaceSuffix + spaceAvg + (i - begin < spaceExtra ? 1 : 0);
      while (n > 0) {
        sb.push(" ");
        n -= 1;
      }
    }
    // 填入最后一个单词
    sb.push(words[end]);

    // 补上这一行最后的空格（如果有）
    let lastSpaceCnt = maxWidth - sb.join("").length;
    while (lastSpaceCnt > 0) {
      sb.push(" ");
      lastSpaceCnt -= 1;
    }

    return sb.join("");
  };

  /* 主体逻辑 */
  for (let i = 0; i < words.length; i++) {
    // +1的目的是每个单词和每个单词之间的一个空格
    count += words[i].length + 1;
    // 如果加上下一个词就超过长度了，或者已经是最后一个单词，即可凑成一行
    if (i == words.length - 1 || count + words[i + 1].length > maxWidth) {
      // 对每行单词进行空格平均划分(从begin到目前的i)
      res.push(fillWords(begin, i));
      begin = i + 1;
      count = 0;
    }
  }
  return res;
};
// @lc code=end
