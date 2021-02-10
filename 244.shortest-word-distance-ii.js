/*
 * @lc app=leetcode id=244 lang=javascript
 *
 * [244] Shortest Word Distance II
 */

// @lc code=start
/**
 * @param {string[]} words
 */
var WordDistance = function (words) {
  this.locations = {};

  // Prepare a mapping from a word to all it's locations (indices).
  for (let i = 0; i < words.length; i++) {
    if (this.locations[words[i]] == null) {
      this.locations[words[i]] = [i];
    } else {
      this.locations[words[i]].push(i);
    }
  }

  console.log(this.locations);
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
WordDistance.prototype.shortest = function (word1, word2) {
  // Location lists for both the words
  // the indices will be in SORTED order by default
  let loc1 = this.locations[word1];
  let loc2 = this.locations[word2];

  console.log(loc1);
  console.log(loc2);

  let l1 = 0,
    l2 = 0,
    minDiff = Number.MAX_VALUE;
  while (l1 < loc1.length && l2 < loc2.length) {
    minDiff = Math.min(minDiff, Math.abs(loc1[l1] - loc2[l2]));
    if (loc1[l1] < loc2[l2]) l1++;
    else l2++;
  }

  return minDiff;
};

// let wd = new WordDistance(["practice", "makes", "perfect", "coding", "makes"]);
// wd.shortest("practice", "coding");
/**
 * Your WordDistance object will be instantiated and called as such:
 * var obj = new WordDistance(words)
 * var param_1 = obj.shortest(word1,word2)
 */
// @lc code=end
