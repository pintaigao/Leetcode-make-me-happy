/*
 * @lc app=leetcode id=451 lang=javascript
 *
 * [451] Sort Characters By Frequency
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */

// Approach 1: Arrays and Sorting O(nlogn) O(n)
var frequencySort = function (s) {
  if (s == null || s.length == 0) return s;

  // Create a sorted Array of chars.
  let chars = s.split("");
  chars.sort();

  // Convert identical chars into single Strings.
  let charStrings = [];
  let currentString = "";
  currentString += chars[0];

  // 组合
  for (let i = 1; i < chars.length; i++) {
    if (chars[i] != chars[i - 1]) {
      charStrings.push(currentString);
      currentString = "";
    }
    currentString += chars[i];
  }
  charStrings.push(currentString);

  // Our comparator is (a, b) -> b.length() - a.length().
  // If a is longer than b, then a negative number will be returned
  // telling the sort algorithm to place a first. Otherwise, a positive
  // number will be returned, telling it to place a second.
  // This results in a longest to shortest sorted list of the strings.
  charStrings.sort((a, b) => b.length - a.length);

  // Use StringBuilder to build the String to return.
  return charStrings.join("");
};

// Approach 2: HashMap and Sort
let frequencySort2 = function (s) {
  // Count up the occurances.
  let counts = {};
  for (let c of s.split("")) {
    counts[c] = (counts[c] || 0) + 1;
  }

  // Make a list of the keys, sorted by frequency.
  let characters = Object.keys(counts);
  characters.sort((a, b) => counts[b] - counts[a]);

  // Convert the counts into a string with a sb.
  let sb = "";
  for (let c of characters) {
    let copies = counts[c];
    for (let i = 0; i < copies; i++) {
      sb += c;
    }
  }
  return sb;
};

//Approach 3: Multiset and Bucket Sort O(n) O(n)
let frequencySort3 = function (s) {
  if (s == null || s.length == 0) return s;

  // Count up the occurances.
  let counts = {};
  let maximumFrequency = 1;
  for (let c of s.split("")) {
    if (!counts.hasOwnProperty(c)) {
      counts[c] = 1;
    } else {
      counts[c] += 1;
      if (counts[c] > maximumFrequency) {
        maximumFrequency = counts[c];
      }
    }
  }

  console.log(maximumFrequency);

  // Make the list of buckets and apply bucket sort.
  let buckets = [];
  for (let i = 0; i <= maximumFrequency; i++) {
    buckets.push([]);
  }
  for (let key of Object.keys(counts)) {
    let freq = counts[key];
    buckets[freq].push(key);
  }

  // Build up the string.
  let sb = "";
  for (let i = buckets.length - 1; i >= 1; i--) {
    for (let c of buckets[i]) {
      for (let j = 0; j < i; j++) {
        sb += c;
      }
    }
  }
  return sb;
};

frequencySort3("tree");
// @lc code=end
