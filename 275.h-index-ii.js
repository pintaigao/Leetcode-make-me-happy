/*
 * @lc app=leetcode id=275 lang=javascript
 *
 * [275] H-Index II
 */
/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function (citations) {
  //using binary search 
  if (citations.length === 0) return 0;
  var left = 0;
  var right = citations.length - 1;
  var mid;
  while (left + 1 < right) {
    mid = left + Math.floor((right - left) / 2); 
    console.log(mid);
    if (citations[mid] == citations.length - mid) {
      return citations[mid];
    } else if (citations[mid] > citations.length - mid) {
      right = mid;
    } else {
      left = mid;
    }
  }

  if (citations[left] >= citations.length - left) return citations.length - left;
  if (citations[right] >= citations.length - right) return citations.length - right;
  return 0;
};

let result = hIndex([0,1,4,5,6]);
console.log(result);

