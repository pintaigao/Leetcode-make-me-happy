/*
 * @lc app=leetcode id=422 lang=javascript
 *
 * [422] Valid Word Square
 */
/**
 * @param {string[]} words
 * @return {boolean}
 */
var validWordSquare = function (words) {
  let rowLength = words.length;
  let columnLength = words[0].length;

  if(rowLength !== columnLength){
    return false;
  }

  for (let i = 0; i < rowLength; i++) {
    if (words[i].length > rowLength) {
      return false;
    }
    for (let j = 0; j < words[i].length; j++) {
      if(words[j] == undefined || words[i][j] !== words[j][i] ){
        return false
      }
    }
  }

  return true;
};

