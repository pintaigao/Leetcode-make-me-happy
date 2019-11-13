/*
 * @lc app=leetcode id=64 lang=javascript
 *
 * [64] Minimum Path Sum
 */
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  if (grid.length===0)return 0;
  for (let i=0; i<grid.length;i++){
      for (let j=0; j<grid[i].length;j++){
          if (!(i===0&&j===0)){
              if (i===0) {grid[i][j]+=grid[i][j-1];}
              else if (j===0) {grid[i][j]+=grid[i-1][j];}
              else{ grid[i][j] += Math.min(grid[i][j-1], grid[i-1][j])}
          }
          if (i===grid.length-1 && j===grid[i].length-1) return grid[i][j]
      }
  }
};

