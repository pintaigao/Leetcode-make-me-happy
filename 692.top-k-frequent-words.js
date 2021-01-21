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
// var topKFrequent = function (words, k) {
//   let map = [];
//   for (let i = 0; i < words.length; i++) {
//     if (map[words[i]]) {
//       map[words[i]] = map[words[i]] + 1;
//     } else {
//       map[words[i]] = 1;
//     }
//   }

//   // console.log(map);
//   let keySet = Object.keys(map);

//   keySet.sort((str1, str2) => {
//     return map[str1] === map[str2]
//       ? str1.localeCompare(str2)
//       : map[str2] - map[str1];
//   });
//   // console.log(keySet);

//   let result = [];

//   for (let i = 0; i < words.length; i++) {
//     if (k) {
//       result.push(keySet[i]);
//       k--;
//     }
//   }

//   // console.log(result);
//   return result;
// };

// 更快的做法
var topKFrequent = function (words, k) {
  let map = {};
  for (word of words) {
    map[word] = map[word] + 1 || 1;
  }

  console.log(map);
  let result = Object.keys(map).sort((a, b) => {
    let countCompare = map[b] - map[a];
    if (countCompare !== 0) return countCompare;

    // 按字母升序排序如果出现的次数是相同的话 a - b > 0就是小的再前面咯
    return a > b ? 1 : -1;
  });

  console.log(result);

  return result.slice(0, k);
};

topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 3);
// @lc code=end
