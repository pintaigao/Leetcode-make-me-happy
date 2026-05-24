/**
 * @param {string[]} words
 * @param {number[]} weights
 * @return {string}
 */
const obj = Object.fromEntries(
  Array.from({ length: 26 }, (_, i) => [i, String.fromCharCode(97 + 25 - i)]),
);
var mapWordWeights = function (words, weights) {
  // a 的 charCode 是 97, b是 98
  // 遍历 words 拿到 word, 再遍历 word 拿到 char, 对应转 charCode - 97; 就可以找到在 weights 的索引元素，reduce 求和
  let res = "";
  words.forEach((word) => {
    let sum = 0;
    for (const char of word) {
      sum += weights[char.charCodeAt(0) - 97];
    }
    res += obj[sum % 26];
  });
  return res;
};