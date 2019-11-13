/*
 * @lc app=leetcode id=863 lang=javascript
 *
 * [863] All Nodes Distance K in Binary Tree
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} K
 * @return {number[]}
 */
var distanceK = function(root, target, K) {
  var ans=[];
  var find=function(n,d){
      if(!n || d<0) return;
      if(d==0) ans.push(n.val);
      find(n.left,d-1);
      find(n.right,d-1);
      
  }
  var dis=function(n){
      if(!n) return -1;
      if(n==target){
          find(n,K);
          return 0;
      }
      var l=dis(n.left);
      var r=dis(n.right);
      if(l>=0){
          if(l+1==K) ans.push(n.val);
          find(n.right,K-l-2);
          return l+1;
      }
      if(r>=0){
          if(r+1==K) ans.push(n.val);
          find(n.left,K-r-2);
          return r+1;
      }
  }
  dis(root);
  return ans;
};

