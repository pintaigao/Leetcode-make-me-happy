/*
 * @lc app=leetcode id=922 lang=javascript
 *
 * [922] Sort Array By Parity II
 */
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function(A) {  
  let res = new Array(A.length), odd = 1, even = 0
  for ( let i =0; i < A.length; i++) {
      if (A[i] % 2) {
          res[odd] = A[i]
          odd += 2
      } else {
          res[even] = A[i]
          even += 2
      }
  }
  
  return res
}    
  


