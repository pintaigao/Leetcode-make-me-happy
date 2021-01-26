/*
 * @lc app=leetcode id=767 lang=javascript
 *
 * [767] Reorganize String
 */

// @lc code=start
/**
 * @param {string} S
 * @return {string}
 */
var reorganizeString = function (str) {
  // build a frequency map for characters in S - max 26 entries...
  let map = {};
  for (let i = 0, len = str.length; i < len; i++) {
    let char = str[i];
    map[char] = (map[char] || 0) + 1;
  }
  //   console.log(map);
  // 以上完了会得到{ a: 2, b: 2, c: 1, e: 1 }

  // sorted array based on frequency count - max 26 entries => O(1) => constant time
  let sorted = Object.keys(map).sort((a, b) => map[b] - map[a]);
  console.log(sorted);
  // 以上完了会得到[ 'a', 'b', 'c', 'e' ]，按出现次数从大到小排序

  // fast path early return if a count is (N+1) / 2 for first item
  let max = (str.length + 1) / 2;
  if (map[sorted[0]] > max) return "";

  // interleave characters
  let result = [];
  let position = 0;
  for (let i = 0, len = sorted.length; i < len; i++) {
    let char = sorted[i];
    let frequency = map[char];

    // 以上得到Key和Value
    for (let j = 0; j < frequency; j++) {
      // rewind pointer to 1 when we overflow odd indexes...
      // note: we don't have enough characters to overflow again
      if (position >= str.length) position = 1;
      result[position] = char;
      position += 2;
    }

    // 以上 隔空插
  }
  return result.join("");
};
// @lc code=end

reorganizeString("aaabcbed");
