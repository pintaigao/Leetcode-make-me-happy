/**
 * @param {string[]} words1
 * @param {string[]} words2
 * @return {string[]}
 */
var wordSubsets = function (words1, words2) {
  let charArray = new Array(26).fill(0), result = [];
  for (let char of words2) {
    let char2 = new Array(26).fill(0);
    for (let c of char) {
      char2[c.charCodeAt(0) - "a".charCodeAt(0)] += 1
      charArray[c.charCodeAt(0) - "a".charCodeAt(0)] = Math.max(charArray[c.charCodeAt(0) - "a".charCodeAt(0)], char2[c.charCodeAt(0) - "a".charCodeAt(0)])
    }
  }

  for (let word of words1) {
    let dict = new Array(26).fill(0), flag = true;
    for (let char of word) {
      if (charArray[char.charCodeAt(0) - "a".charCodeAt(0)] == 0) {
        continue
      } else {
        dict[char.charCodeAt(0) - "a".charCodeAt(0)] += 1
      }
    }

    for (let i = 0; i < dict.length; i++) {
      if (dict[i] >= charArray[i]) {
        continue;
      } else {

        flag = false;
        break;
      }
    }

    if (flag) {
      result.push(word);
    }
  }

  console.log(result);


  return result;
};

wordSubsets(["amazon", "apple", "facebook", "google", "leetcode"], ["lo", "eo"])