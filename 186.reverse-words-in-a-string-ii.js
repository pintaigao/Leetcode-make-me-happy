/*
 * @lc app=leetcode id=186 lang=javascript
 *
 * [186] Reverse Words in a String II
 */
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseWords = function (str) {
  reverse(str);
  let start = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i + 1] === ' ' || i + 1 === str.length)
      reverse(str, start, i);
    else if (str[i] === ' ')
      start = i + 1;
  }
};

function reverse(arr, start = 0, end = arr.length - 1) {
  let len = end - start + 1;
  while (start < end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start += 1;
    end -= 1;
  };
}

