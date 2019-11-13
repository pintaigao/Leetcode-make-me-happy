/*
 * @lc app=leetcode id=255 lang=javascript
 *
 * [255] Verify Preorder Sequence in Binary Search Tree
 */
/**
 * @param {number[]} preorder
 * @return {boolean}
 */
var verifyPreorder = function(preorder) {
    let root = Number.MIN_SAFE_INTEGER;
    let stack = [];
    for(num of preorder) {
      if(num < root) 
        return false;
      let n = stack.length;
      while(n>0&&stack[n-1] < num){
        root = stack.pop();
        n = stack.length;
      }
      stack.push(num);
    }
    return true;
};

var verifyPreorder = function(preorder) {
};

