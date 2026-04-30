/**
 * @param {string[]} words
 * @param {string} chars
 * @return {number}
 */
var countCharacters = function (words, chars) {
  let charArray = new Array(26).fill(0), result = 0;

  for (let c of chars) {
    charArray[c.charCodeAt(0) - 'a'.charCodeAt(0)] += 1
  }

  for (let word of words) {
    let charArrayCopy = charArray.slice(), index = 0;
    for (let char of word) {
      if (charArrayCopy[char.charCodeAt(0) - "a".charCodeAt(0)] > 0) {
        charArrayCopy[char.charCodeAt(0) - "a".charCodeAt(0)] -= 1;
        index += 1;
      } else {
        break;
      }
    }

    if (index === word.length) {
      result += index;
    }
  }

  console.log(result);

  return result;
};


// countCharacters(["cat", "bt", "hat", "tree"], "atach")
countCharacters(["hello", "world", "leetcode"], "welldonehoneyr")