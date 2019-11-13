/*
 * @lc app=leetcode id=261 lang=javascript
 *
 * [261] Graph Valid Tree
 */
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
class UnionFind {
  constructor(n) {
      this.list = new Array(n).fill(0).map((_, index) => index);
      this.length = n;
  }
  
  find(index) {
      while (this.list[index] !== index) {
          index = this.list[this.list[index]]; 
      }
      
      return index;
  }
  
  union(a, b) {
      let rootA = this.find(a);
      let rootB = this.find(b);
      
      if (rootA === rootB) return false;
      
      this.list[rootA] = rootB;
      this.length--;
      return true;
  }
  
  get size() {
      return this.length;
  }
}
var validTree = function(n, edges) {
  const uf = new UnionFind(n);
  
  for (let i = 0; i < edges.length; i++) {
      let [a, b] = edges[i];
      if (!uf.union(a, b)) {
          return false;
      }
  }
  
  return uf.size === 1;
};


validTree(5, [[0,1], [1,2], [2,3], [1,3], [1,4]]);


