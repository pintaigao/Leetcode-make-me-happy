/*
 * @lc app=leetcode id=438 lang=javascript
 *
 * [438] Find All Anagrams in a String
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */

/* Solution 1:划窗 */
var findAnagrams = function (s, p) {
  let ns = s.length, np = p.length, pCount = new Array(26).fill(0), sCount = new Array(26).fill(0), result = [], left = 0, right = 0;
  if (ns < np) return [];

  // build reference array using string p
  for (let ch of p) {
    pCount[ch.charCodeAt() - "a".charCodeAt()] += 1;
  }

  // sliding window on the string s
  while (right < ns) {
    // add one more letter
    // on the right side of the window
    sCount[s.charCodeAt(right) - "a".charCodeAt()]++;
    // remove one letter
    // from the left side of the window
    if (right - left >= np) {
      // 划窗，只保持窗口大小为np
      sCount[s.charCodeAt(left) - "a".charCodeAt()]--;
      left++;
    }
    // compare array in the sliding window
    // with the reference array
    // unique pattern
    if (pCount.join("") === sCount.join("")) { result.push(left) }
    right++;
  }

  console.log(result);
  return result;
};
// @lc code=end


// 练习
var findAnagrams2 = function (s, p) {
  let result = [], sArray = s.split(""), pArray = p.split(""), left = 0, right = 0, seen = {}, count = 0;

  for (let char of pArray) {
    seen[char] = (seen[char] || 0) + 1;
  }

  while (right <= sArray.length) {
    let char = sArray[right];
    if (seen.hasOwnProperty(char)) {
      seen[char]--;

      if (seen[char] === 0) {
        count += 1;
      }
    }

    right += 1;

    console.log(seen);


    if (right - left >= pArray.length) {
      if (count === Object.keys(seen).length) {
        result.push(left);
      }

      let leftChar = sArray[left];
      if (seen.hasOwnProperty(leftChar)) {
        if (seen[leftChar] === 0) {
          count -= 1;
        }

        seen[leftChar]++;
      }

      left++;
    }
  }

  return result;
}

findAnagrams2("cbaebabacd", "abc"); // [0, 6]