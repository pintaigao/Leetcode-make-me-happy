/*
 * @lc app=leetcode id=953 lang=javascript
 *
 * [953] Verifying an Alien Dictionary
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
  let alphatOrder = [];

  // index array 里面的index表示实际的字母，而value表示字母在order中的位置
  // 这步完了之后[5,6,7,4,8,9,10,11,12,13,14,3,15,16,1,17,18,2,19,20,21,22,0,23,24,25], 每个index表示其字母的排名，a排在第5位
  for (let i = 0; i < order.length; i++) {
    alphatOrder[order.charCodeAt(i) - "a".charCodeAt(0)] = i;
  }

  for (let i = 0; i < words.length - 1; ++i) {
    let compareWords = true;
    let word1 = words[i];
    let word2 = words[i + 1];

    for (let index = 0; index < Math.min(word1.length, word2.length); index++) {
      // 比较两个字母，如果不相等，则比较两个字母的排名
      if (word1[index] != word2[index]) {
        let ch1 = word1.charCodeAt(index) - "a".charCodeAt(0);
        let ch2 = word2.charCodeAt(index) - "a".charCodeAt(0);

        // 关键在这一步，index[ch1] > index[ch2] 表示ch1的字母比ch2要排的后
        if (alphatOrder[ch1] > alphatOrder[ch2]) {
          // 所以如果按这个顺序前两个比较，发现第一个的字母比第二个的字母排得要后，false
          return false;
        } else {
          // 如果不是，没必要往下比了
          compareWords = false;
          break;
        }
      }
    }

    // 如果前面的比较都没有发现不相等的情况，则表示前面的字母相等，可以比较长度，短的排在前面
    if (word1.length > word2.length && compareWords) {
      return false;
    }
  }

  return true;
};
// @lc code=end

// console.log(isAlienSorted(["abcde", "abc"], "abcdefghijklmnopqrstuvwxyz"));
console.log(
  isAlienSorted(["word", "world", "row"], "worldabcefghijkmnpqstuvxyz")
);
