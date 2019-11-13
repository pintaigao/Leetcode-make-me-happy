/*
 * @lc app=leetcode id=290 lang=javascript
 *
 * [290] Word Pattern
 */

// @lc code=start
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
var wordPattern = function (pattern, str) {

  let stringArr = str.split(" ");

  if (pattern.length !== stringArr.length) {
    return false;
  }

  console.log(stringArr);
  let patternMap = {};
  let stringMap = {};
  for (let i = 0; i < stringArr.length; i++) {
    let word = stringArr[i];
    let p = pattern[i];

    if (stringMap.hasOwnProperty(word) && stringMap[word] !== p || patternMap.hasOwnProperty(p) && patternMap[p] !== word) {
      // return false;
    }
    stringMap[word] = p;
    patternMap[p] = word;
  }
  console.log(patternMap);
  console.log(stringMap);

  return true;
};

wordPattern("abba", "dog cat cat dog");
// @lc code=end

