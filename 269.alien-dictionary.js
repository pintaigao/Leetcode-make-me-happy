/*
 * @lc app=leetcode id=269 lang=javascript
 *
 * [269] Alien Dictionary
 */

// @lc code=start
/**
 * @param {string[]} words
 * @return {string}
 */

// 1. BFS的方法
// var alienOrder = function (words) {
//   // Step 0: Create data structures and find all unique letters.
//   let adjList = {};
//   let counts = {};
//   for (let word of words) {
//     for (let c of word.split("")) {
//       counts[c] = 0;
//       adjList[c] = [];
//     }
//   }

//   // Step 1: Find all edges.
//   for (let i = 0; i < words.length - 1; i++) {
//     let word1 = words[i];
//     let word2 = words[i + 1];
//     // Check that word2 is not a prefix of word1. 这一步防止["abc","ab"]这种类型的
//     if (word1.length > word2.length && word1.startsWith(word2)) {
//       return "";
//     }
//     // Find the first non match and insert the corresponding relation.
//     for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
//       if (word1[j] != word2[j] || adjList[word1[j]].indexOf(word2[j]) !== -1) {
//         console.log("Now comparing two word is:");
//         console.log(`${word1} ${word1[j]}`);
//         console.log(`${word2} ${word2[j]}`);
//         console.log();
//         adjList[word1[j]].push(word2[j]);
//         counts[word2[j]] = counts[word2[j]] + 1;
//         break;
//       }
//     }
//   }

//   console.log(counts);
//   console.log(adjList);

//   // Step 2: Breadth-first search.
//   let sb = "";
//   let queue = [];
//   for (let c in counts) {
//     if (counts[c] === 0) {
//       queue.push(c);
//     }
//   }
//   while (queue.length !== 0) {
//     let c = queue.shift();
//     sb += c;
//     for (let next of adjList[c]) {
//       counts[next] = counts[next] - 1;
//       if (counts[next] === 0) {
//         queue.push(next);
//       }
//     }
//   }
//   console.log(sb);

//   if (sb.length < Object.keys(counts).length) {
//     return "";
//   }
//   return sb;
// };

// 2. DFS的方法
let reverseAdjList = {};
let seen = {};
let output = "";
var alienOrder = function (words) {
  // Step 0: Put all unique letters into reverseAdjList as keys.
  for (let word of words) {
    for (let c of word.split("")) {
      if (!reverseAdjList.hasOwnProperty(c)) {
        reverseAdjList[c] = [];
      }
    }
  }

  // Step 1: Find all edges and add reverse edges to reverseAdjList.
  for (let i = 0; i < words.length - 1; i++) {
    let word1 = words[i];
    let word2 = words[i + 1];
    // Check that word2 is not a prefix of word1.
    if (word1.length > word2.length && word1.startsWith(word2)) {
      return "";
    }
    // Find the first non match and insert the corresponding relation.
    for (let j = 0; j < Math.min(word1.length, word2.length); j++) {
      if (
        word1[j] != word2[j] ||
        reverseAdjList[word2[j]].indexOf(word1[j]) !== -1
      ) {
        reverseAdjList[word2[j]].push(word1[j]);
        break;
      }
    }
  }

  console.log(reverseAdjList);

  // Return true if no cycles detected.
  let dfs = function (c) {
    if (seen.hasOwnProperty(c)) {
      return seen[c]; // If this node was grey (false), a cycle was detected.
    }
    seen[c] = false;
    for (let next of reverseAdjList[c]) {
      let result = dfs(next);
      if (!result) return false;
    }
    seen[c] = true;
    output += c;
    return true;
  };

  // Step 2: DFS to build up the output list.
  for (let c in reverseAdjList) {
    let result = dfs(c);
    if (!result) return "";
  }

  if (output.length < Object.keys(reverseAdjList).length) {
    return "";
  }

  console.log(output);
  return output;
};

alienOrder2([
  "wxqkj",
  "whqg",
  "cckgh",
  "cdxg",
  "cdxdt",
  "cdht",
  "ktgxt",
  "ktgch",
  "ktdw",
  "ktdc",
  "jqw",
  "jmc",
  "jmg",
]);
// @lc code=end
