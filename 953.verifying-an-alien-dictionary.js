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
  let index = [];

  for (let i = 0; i < order.length; i++) {
    index[order.charCodeAt(i) - "a".charCodeAt(0)] = i;
  }

  // 这步完了之后[5,6,7,4,8,9,10,11,12,13,14,3,15,16,1,17,18,2,19,20,21,22,0,23,24,25], 每个index表示其字母的排名，a排在第5位
  console.log(index);

  for (let i = 0; i < words.length - 1; ++i) {
    let word1 = words[i];
    let word2 = words[i + 1];
    let compareWords = true;

    console.log(`Comparing two word: ${word1} and ${word2}`);

    for (
      let length = 0;
      length < Math.min(word1.length, word2.length);
      length++
    ) {
      if (word1[length] != word2[length]) {
        console.log(`Comparing char ${word1[length]} and ${word2[length]}`);
        let ch1 = word1.charCodeAt(length) - "a".charCodeAt(0);
        let ch2 = word2.charCodeAt(length) - "a".charCodeAt(0);

        // 关键在这一步，index[ch1] > index[ch2] 表示ch1的字母比ch2要排的后
        if (index[ch1] > index[ch2]) {
          // 所以如果按这个顺序前两个比较，发现第一个的字母比第二个的字母排得要后，false
          return false;
        } else {
          // 如果不是，没必要往下比了
          compareWords = false;
          break;
        }
      }
    }

    if (word1.length > word2.length && compareWords) {
      return false;
    }
  }

  return true;
};
// @lc code=end

isAlienSorted(["word", "world", "row"], "worldabcefghijkmnpqstuvxyz");
