/*
 * @lc app=leetcode id=424 lang=javascript
 *
 * [424] Longest Repeating Character Replacement
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

/* 划窗 */
var characterReplacement = function (s, k) {
  let [len, start, maxCount, maxLength] = [s.length, 0, 0, 0];
  let count = new Array(26).fill(0);

  // maxCount = largest count of a single, unique character in the current window
  for (let end = 0; end < len; end++) {
    maxCount = Math.max(maxCount, (count[s.charCodeAt(end) - "A".charCodeAt()] += 1));

    // console.log("Now Char is:" + s[end] + end);

    // console.log(count);
    // console.log(maxCount);

    // 关键

    // When end-start+1-maxCount == 0, then then the window is filled with only one character
    // When end-start+1-maxCount > 0, then we have characters in the window that are NOT the character that occurs the most.
    // end-start+1-maxCount is equal to exactly the # of characters that are NOT the character that occurs the most in that window. Example: For a window "xxxyz", end-start+1-maxCount would equal 2. (maxCount is 3 and there are 2 characters here, "y" and "z" that are not "x" in the window.)
    // But if we then find a "z" after, like "xxxyz", then we need to shrink the window because now end-start+1-maxCount = 2, and 2 > 1. The window becomes "xxyz".
    // 因为我们关心的是maxlength，移window的目的就是保持maxLength的长度，让下一个移的window（保持的maxlength）和之前的比较，你不可能现在maxLength是4的话下一个一移就变成3了，那maxLength永远就是4了
    if (maxCount + k < end - start + 1) {
      count[s.charCodeAt(start) - "A".charCodeAt(0)] -= 1;
      start += 1;
    } else {
      maxLength = Math.max(maxLength, end - start + 1);
    }
  }
  return maxLength;
};
// @lc code=end

// 练习

var characterReplacement10 = function (s, k) {
  // 统计窗口中每个字符的出现次数
  // 记录窗口中字符的最多重复次数
  // 记录这个值的意义在于，最划算的替换方法肯定是把其他字符替换成出现次数最多的那个字符
  // 记录结果长度
  let left = 0, right = 0, windowCharCount = new Array(26).fill(0), windowMaxCount = 0, res = 0;

  // 开始滑动窗口模板
  while (right < s.length) {
    // 扩大窗口
    let c = s.charCodeAt(right) - 'A'.charCodeAt(0);
    windowCharCount[c]++;
    windowMaxCount = Math.max(windowMaxCount, windowCharCount[c]);
    right++;

    // 这个 while 换成 if 也可以
    while (right - left - windowMaxCount > k) {
      // 说明 k 次替换机会不足以使窗口内的字符全部相同，此时必须缩小窗口。
      // 此时，k 次替换已经无法把窗口内的字符都替换成相同字符了
      // 必须缩小窗口
      windowCharCount[s.charCodeAt(left) - 'A'.charCodeAt(0)]--;
      left++;
    }
    // 经过收缩后，此时一定是一个合法的窗口
    res = Math.max(res, right - left);
  }
  return res;
}