/*
 * @lc app=leetcode id=271 lang=javascript
 *
 * [271] Encode and Decode Strings
 */
/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
let map = {};
var encode = function (strs) {
  let hashTable = [];
  if (strs.length === 0) return [];
  for (let i = 0; i < strs.length; i++) {

    if (strs[i] === '') {
      hashTable.push("")
    } else {
      map[strs[i]] = `${strs[i]}${hashTable.length - 1}`;
      hashTable.push(`${strs[i]}${hashTable.length - 1}`)

    }
  }
  return hashTable;
};

/**
 * Decodes a single string to a list of strings.
 *
 * @param {string} s
 * @return {string[]}
 */
var decode = function (s) {
  if (s.length === 0) return [];
  let result = [];

  for (let i = 0; i < s.length; i++) {

    if (s[i] === "") {
      result.push("")

    }
    for (let val in map) {

      if (map[val] !== "" && s[i] !== "" && map[val] === s[i]) {
        result.push(val)
      }

    }
  }


  return result;
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */

