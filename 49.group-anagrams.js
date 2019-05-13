/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let map = {};
  let result = [];
  for (let word of strs) {
    let pattern = generateASC(word);
    if (map[pattern] !== undefined) {
      map[pattern].push(word);
    } else {
      map[pattern] = new Array();
      result.push(map[pattern]);
      map[pattern].push(word);
    }
  }
  return result;
};

function generateASC(word) {
  let ascArray = new Array(26).fill(0);
  for (let c of word) {
    ascArray[c.charCodeAt() - "a".charCodeAt()]++;
  }
  return ascArray.join("");
}