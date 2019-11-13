/*
 * @lc app=leetcode id=96 lang=javascript
 *
 * [96] Unique Binary Search Trees
 */
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
  if (n === 1) {
      return 1; 
  }
  let memo = [1,1]; // size of n
  
  for (let i = 1; i< n; i++){
      // first iteration n = 1 
      let numNodes = i + 1;
      let result = 0;
      for (let j = 0; j < numNodes; j++){
          let numLeft = j; // number of nodes to the left 
          let numRight = numNodes - (j+1); // number of stuff to the right 
          result = result + (memo[numLeft] * memo[numRight]);
      }
      memo[i + 1] = result;
  }
  return memo[n];
};

