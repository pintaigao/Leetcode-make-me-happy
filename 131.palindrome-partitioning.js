/*
 * @lc app=leetcode id=131 lang=javascript
 *
 * [131] Palindrome Partitioning
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[][]}
 */

// 1. BackTracking O(N⋅2^N) 的时间复杂度
var partition = function (s) {
  let result = [];

  let dfs = function (start, currentList, s) {
    if (start >= s.length) {
      result.push([...currentList]);
    }
    for (let end = start; end < s.length; end++) {
      if (isPalindrome(s, start, end)) {
        // add current substring in the currentList(只能用substring)
        currentList.push(s.substring(start, end + 1));
        dfs(end + 1, currentList, s);
        // backtrack and remove the current substring from currentList
        currentList.pop();
      }
    }
  };

  let isPalindrome = function (s, low, high) {
    while (low < high) {
      if (s[low] != s[high]) {
        return false;
      }
      low += 1;
      high -= 1;
    }
    return true;
  };

  dfs(0, [], s);

  console.log(result);
  return result;
};

partition("aab");

// @lc code=end
