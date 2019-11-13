/*
 * @lc app=leetcode id=547 lang=javascript
 *
 * [547] Friend Circles
 */
/**
 * @param {number[][]} M
 * @return {number}
 */
var findCircleNum = function (M) {

  if (M.length === 0) {
    return 0;
  }

  let len = M.length;
  let result = 0;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < M[0].length; j++) {
      if (M[i][j] === 1) {
        result++;
        findFriends(M, i, j);
      }
    }
  }


  return result;
};

var findFriends = function (M, i, j) {

  if (M[i][j] !== 1) {
    return;
  }
  //mark it visited
  M[i][j] = '#';

  for (let k = 0; k < M.length; k++) {
    findFriends(M, j, k);
  }
};

