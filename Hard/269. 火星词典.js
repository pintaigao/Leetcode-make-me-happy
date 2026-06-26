var alienOrder = function (words) {
  // graph: 邻接表，每个字符后面 exactly 接的是什么
  // indegree: 入度表，表示的是每个字符的入度，即字符前面接的是什么 
  let graph = new Map(), indegree = new Map(), queue = [], result = "";

  // Step 1: initialize all characters
  for (const word of words) {
    for (const char of word) {
      if (!graph.has(char)) {
        graph.set(char, new Set());
      }
      if (!indegree.has(char)) {
        indegree.set(char, 0);
      }
    }
  }

  // Step 2: build graph from adjacent words
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i], word2 = words[i + 1], len = Math.min(word1.length, word2.length);
    // Invalid case: ["abc", "ab"]
    if (word1.length > word2.length && word1.startsWith(word2)) { return ""; }
    for (let j = 0; j < len; j++) {
      const c1 = word1[j], c2 = word2[j];

      if (c1 !== c2) {
        // avoid duplicate edge
        if (!graph.get(c1).has(c2)) {
          graph.get(c1).add(c2);
          indegree.set(c2, indegree.get(c2) + 1);
        }

        // only the first different character matters
        break;
      }
    }
  }

  // Step 3: topological sort
  for (const [char, degree] of indegree) { degree === 0 && queue.push(char) }
  while (queue.length > 0) {
    const char = queue.shift();
    result += char;

    for (const next of graph.get(char)) {
      indegree.set(next, indegree.get(next) - 1);

      if (indegree.get(next) === 0) { queue.push(next); }
    }
  }

  // If not all chars are used, there is a cycle
  return result.length === indegree.size ? result : "";
};

// 例子
console.log(alienOrder(["wrt", "wrf", "er", "ett", "rftt"])); // 输出: "wertf"