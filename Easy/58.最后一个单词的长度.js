/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  let index = s.length - 1;
  while (s[index] === ' ') {
    index--;
  }
  let wordLength = 0;
  while (index >= 0 && s[index] !== ' ') {
    wordLength++;
    index--;
  }
  return wordLength;
};