/*
 * @lc app=leetcode id=244 lang=javascript
 *
 * [244] Shortest Word Distance II
 */

// @lc code=start
/**
 * @param {string[]} wordsDict
 */
var WordDistance = function (wordsDict) {
  this.locations = {};

  // Prepare a mapping from a word to all it's locations (indices).
  for (let i = 0; i < wordsDict.length; i++) {
    this.locations[wordsDict[i]] = this.locations[wordsDict[i]] ? [...this.locations[wordsDict[i]], i] : [i];
  }
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
WordDistance.prototype.shortest = function (word1, word2) {
  // Location lists for both the words
  // the indices will be in SORTED order by default
  let [loc1, loc2] = [this.locations[word1], this.locations[word2]];
  let [l1, l2, minDiff] = [0, 0, Number.MAX_VALUE];
  // 得到的是loc1和loc2两个array，里面是word1和word2的所有index
  while (l1 < loc1.length && l2 < loc2.length) {
    // 然后就是找出两个array里面的最小的diff
    minDiff = Math.min(minDiff, Math.abs(loc1[l1] - loc2[l2]));
    if (loc1[l1] < loc2[l2]) l1++;
    else l2++;
  }

  return minDiff;
};

/**
 * Your WordDistance object will be instantiated and called as such:
 * var obj = new WordDistance(wordsDict)
 * var param_1 = obj.shortest(word1,word2)
 */
// @lc code=end
