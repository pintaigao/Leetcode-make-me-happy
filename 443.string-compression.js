/*
 * @lc app=leetcode id=443 lang=javascript
 *
 * [443] String Compression
 */

// @lc code=start
/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
  let [n, i, j] = [chars.length, 0, 0];

  let reverse = (chars, start, end) => {
    while (start < end) {
      let t = chars[start];
      chars[start] = chars[end];
      chars[end] = t;
      start++;
      end--;
    }
  };
  while (i < n) {
    let idx = i;
    // 指针指向一个char，然后看看这个char后面跟着多少重复的char
    while (idx < n && chars[idx] == chars[i]) idx++;
    let cnt = idx - i;
    // 将当前字符插入到答案;并让 j 指针后移
    chars[j] = chars[i];
    j += 1;
    if (cnt > 1) {
      // start是从答案char[j]的下一个位置开始
      let [start, end] = [j, j];
      while (cnt != 0) {
        chars[end] = (cnt % 10) + "";
        cnt = parseInt(cnt / 10);
        end += 1;
      }
      // 翻转这个数字
      reverse(chars, start, end - 1);
      // j 指向最后一个数字
      j = end;
    }
    // 下一个index从idx开始
    i = idx;
  }
  return j;
};
// @lc code=end
