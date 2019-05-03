/**
 * @param {string} s
 * @return {string}
 */

let result = 0;
let lo;
let high;

var longestPalindrome = function (s) {
  // 1.准备数据
  // 2.处理输入数据
  // 3.核心逻辑
  for (let i = 0; i < s.length - 1; i++) {
    findIt(s, i, i);
    findIt(s, i, i + 1);
  }
  console.log(s.substring(lo, high+1));
  return s.substring(lo, high+1);
};

function findIt(s, i, j) {
  let lenght = 0;
  while (i >= 0 && j < s.length && s[i] === s[j]) {
    lenght = j - i + 1;
    i--;
    j++;
    if (result < lenght) {
      lo = i + 1;
      high = j - 1;
      result = lenght;
    }
  }

  
}

longestPalindrome("cbbd");


// public class Solution {
//   private int lo, maxLen;

//   public String longestPalindrome(String s) {
//     int len = s.length();
//     if (len < 2)
//       return s;

//       for (int i = 0; i < len-1; i++) {
//          extendPalindrome(s, i, i);  //assume odd length, try to extend Palindrome as possible
//          extendPalindrome(s, i, i+1); //assume even length.
//       }
//       return s.substring(lo, lo + maxLen);
//   }

//   private void extendPalindrome(String s, int j, int k) {
//     while (j >= 0 && k < s.length() && s.charAt(j) == s.charAt(k)) {
//       j--;
//       k++;
//     }
//     if (maxLen < k - j - 1) {
//       lo = j + 1;
//       maxLen = k - j - 1;
//     }
//   }}
