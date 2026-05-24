/**
 * @param {string[]} book
 */
var WordsFrequency = function (book) {
  this.map = {};

  for (let word of book) {
    this.map[word] = (this.map[word] || 0) + 1;
  }
};

/** 
 * @param {string} word
 * @return {number}
 */
WordsFrequency.prototype.get = function (word) {
  if (!this.map[word]) {
    return 0;
  } else {
    return this.map[word];
  }
};

/**
 * Your WordsFrequency object will be instantiated and called as such:
 * var obj = new WordsFrequency(book)
 * var param_1 = obj.get(word)
 */

let wordsFrequency = new WordsFrequency(["i", "have", "an", "apple", "he", "have", "a", "pen"]);
console.log(wordsFrequency);
console.log(wordsFrequency.get("have"));

// wordsFrequency.get("you"); //返回0，"you"没有出现过
// wordsFrequency.get("have"); //返回2，"have"出现2次
// wordsFrequency.get("an"); //返回1
// wordsFrequency.get("apple"); //返回1
// wordsFrequency.get("pen"); //返回1