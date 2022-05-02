/*
 * @lc app=leetcode id=567 lang=javascript
 *
 * [567] Permutation in String
 */

// @lc code=start
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
/* Solution 3: Hashmap的方法 */
var checkInclusion = function (s1, s2) {};

/* Solution 4: Array记录26个字母 */
var checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;
  let s1map = new Array(26).fill(0);

  // 记录s1中每个字母出现的次数
  for (let i = 0; i < s1.length; i++) s1map[s1.charCodeAt(i) - "a".charCodeAt(0)] += 1;

  /* 这个题解的思路是ab和eidbaoooc，从e开始，看看ei和ab是不是match，然后从i开始，看看id和ab是不是match，然后从d开始，看看db和ab是不是match...*/
  for (let i = 0; i <= s2.length - s1.length; i++) {
    let s2map = new Array(26).fill(0);
    // 记录这个substring中每个字母出现的次数
    for (let j = 0; j < s1.length; j++) {
      s2map[s2.charCodeAt(i + j) - "a".charCodeAt(0)] += 1;
    }
    console.log(s1map, s2map);
    console.log();
    // 然后看看是不是s1map和s2map是不是match
    if (s1map.toString() === s2map.toString()) return true;
  }
  return false;
};

/* 划窗 */
let checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false;
  let s1map = new Array(26).fill(0);
  let s2map = new Array(26).fill(0);
  // 记录s1中每个字母出现的次数，记录s2前s1.length个字母出现的次数
  for (let i = 0; i < s1.length; i++) {
    s1map[s1.charCodeAt(i) - "a".charCodeAt(0)] += 1;
    s2map[s2.charCodeAt(i) - "a".charCodeAt(0)] += 1;
  }

  let count = 0;

  if (s1map.join("") == s2map.join("")) count += 1;

  for (let i = 0; i < s2.length - s1.length; i++) {
    // 两个指针的位置：s2的i（第一个字母）和i+s1.length（最后一个字母）这个区间
    let [l, r] = [s2.charCodeAt(i) - "a".charCodeAt(0), s2.charCodeAt(i + s1.length) - "a".charCodeAt(0)];
    if (count == 26) return true;

    // r可能是新出现的字母，所以s2map[r]要加1
    s2map[r] += 1;
    // 如果这个字母在s1和s2出现的次数相同，那么count加1
    if (s2map[r] == s1map[r]) count += 1;
    else if (s2map[r] == s1map[r] + 1) count -= 1;
    s2map[l] -= 1;
    if (s2map[l] == s1map[l]) count += 1;
    else if (s2map[l] == s1map[l] - 1) count -= 1;
  }
  return count == 26;
};

/* 较快的划窗 */
var checkInclusion = function (s1, s2) {
  let n = s1.length,
    m = s2.length;
  if (n > m) {
    return false;
  }
  let cnt = new Array(26).fill(0);
  // 记录s1中每个字母数量，用负值表示
  for (let i = 0; i < n; i++) {
    cnt[s1[i].charCodeAt() - "a".charCodeAt()]--;
  }
  let left = 0;
  for (let right = 0; right < m; right++) {
    let x = s2[right].charCodeAt() - "a".charCodeAt();
    // right指针向右每移动一位，s2[right]的数量+1
    cnt[x]++;
    // 一旦某个字符的数量为正，向右移动左指针，直到该字符的数量非正
    while (cnt[x] > 0) {
      cnt[s2[left].charCodeAt() - "a".charCodeAt()]--;
      left++;
    }
    // 注意到 [left,right] 的长度每增加 1，cnt 的元素值之和就增加 1。当 [left,right] 的长度恰好为 n 时，就意味着 cnt 的元素值之和为 0。由于 cnt 的值不为正，元素值之和为 0 就意味着所有元素均为 0，这样我们就找到了一个目标子串。
    if (right - left + 1 === n) {
      return true;
    }
  }
  return false;
};
// @lc code=end
