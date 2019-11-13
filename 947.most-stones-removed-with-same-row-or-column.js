/*
 * @lc app=leetcode id=947 lang=javascript
 *
 * [947] Most Stones Removed with Same Row or Column
 */
/**
 * @param {number[][]} stones
 * @return {number}
 */

var removeStones = function (stones) {
  const N = stones.length
  let parent = []
  let size = []

  //init
  for (let i = 0; i < N; i++) {
    parent[i] = i;
    size[i] = 1;
  }

  const find = (idx) => {
    let root = idx;
    while (parent[root] !== root) {
      root = parent[root]
    }
    //path compression
    while (root !== idx) {
      const next = parent[idx]
      parent[idx] = root;
      idx = next;
    }
    return idx
  }

  const union = (id1, id2) => {
    const p1 = find(id1)
    const p2 = find(id2)
    parent[p1] = p2
    size[p1] += size[p2]
    size[p2] = 1;
  }

  for (let i = 0; i < N - 1; i++) {
    for (let j = i + 1; j < N; j++) {
      if (stones[i][0] === stones[j][0] || stones[i][1] === stones[j][1]) {
        union(i, j)
      }
    }
  }
  
  let ans = 0;
  for (let i = 0; i < N; i++) {
    ans += size[i] - 1
  }

  return ans;

};
