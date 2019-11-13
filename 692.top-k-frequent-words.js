/*
 * @lc app=leetcode id=692 lang=javascript
 *
 * [692] Top K Frequent Words
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {
  let map = [];
  for (let i = 0; i < words.length; i++) {
    if (map[words[i]]) {
      map[words[i]] = map[words[i]] + 1;
    } else {
      map[words[i]] = 1;
    }
  }

  console.log(map);
  let keySet = Object.keys(map);

  keySet.sort((str1, str2) => {
    return map[str1] === map[str2] ? str1.localeCompare(str2) : map[str2] - map[str1];
  });
  console.log(keySet);


  let result = [];

  for (let i = 0; i < words.length; i++) {
    if (k) {
      result.push(keySet[i]);
      k--;
    }
  }

  console.log(result);
  return result;
};

topKFrequent(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4);
// @lc code=end

