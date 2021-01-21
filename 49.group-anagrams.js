/*
 * @lc app=leetcode id=49 lang=javascript
 *
 * [49] Group Anagrams
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  if (strs.length === 0) return [];
  let ans = {};
  let count;
  for (let s of strs) {
    count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      let c = s.charCodeAt(i);
      count[c - "a".charCodeAt(0)] += 1;
    }

    let result = "";
    for (let i = 0; i < 26; i++) {
      result += "#";
      result += count[i];
    }
    let key = result;

    if (!(key in ans)) {
      ans[key] = [];
    }
    ans[key].push(s);
  }

  let answer = [];
  for (key in ans) {
    answer.push(ans[key]);
  }

  return answer;
};

var groupAnagrams = function (strs) {
  if (strs.length === 0) return [];
  let anagrams = new Map();
  for (const str of strs) {
    let id = anagramId(str);
    console.log(id);
    if (!anagrams.get(id)) {
      anagrams.set(id, []);
    }
    anagrams.get(id).push(str);
  }
  return Array.from(anagrams.values());
};

const anagramId = (str) => {
  // so we avoid sorting -> a mapping of the letters to an array
  // that way the array could be the size of the alphabet if w is present
  // the end result is a string
  const id = [];
  for (let i = 0; i < str.length; i++) {
    // to find the right position in the array
    let pos = str.charCodeAt(i) - "a".charCodeAt(0);
    // to account for say "aa"
    id[pos] = id[pos] ? id[pos] + str.charAt(i) : str.charAt(i);
  }

  let result = "";
  for (let i = 0; i < id.length; i++) {
    if (id[i]) result += id[i];
  }
  return result;
};
// @lc code=end

groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
