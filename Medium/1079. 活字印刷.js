/**
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function (tiles) {
  // 先排序，让相同的元素靠在一起
  let res = 0, used = new Array(tiles.length).fill(false), track = [], tilesArray = Array.from(tiles).sort();
  function backtrack() {
    res++;

    for (let i = 0; i < tilesArray.length; i++) {
      // 新添加的剪枝逻辑，固定相同的元素在排列中的相对位置
      if (used[i] || (i > 0 && tilesArray[i] === tilesArray[i - 1] && !used[i - 1])) {
        continue;
      }

      // track.push(tilesArray[i]);
      used[i] = true;
      backtrack();
      // track.pop();
      used[i] = false;
    }
  }

  backtrack();
  return res - 1;
};