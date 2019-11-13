/*
 * @lc app=leetcode id=241 lang=javascript
 *
 * [241] Different Ways to Add Parentheses
 */
/**
 * @param {string} input
 * @return {number[]}
 */
var diffWaysToCompute = function(input) {
  return allEval(input, {});
};


var allEval = function(string, memo) {
  if (memo[string]) return memo[string];

  const opSet = new Set(['+', '-', '*']);
  const output = [];
  for (let i = 0; i < string.length; i++) {
      const char = string[i]; 
      if (opSet.has(char)) {
          const leftRes = allEval(string.substring(0, i), memo);
          const rightRes = allEval(string.substring(i+1), memo);
          
          for (let j = 0; j < leftRes.length; j++) {
              for(let k = 0; k < rightRes.length; k++) {
                  if (char === '+') {
                      output.push(leftRes[j] + rightRes[k]);
                  }
                  if (char === '-') {
                      output.push(leftRes[j] - rightRes[k]);
                  }
                  if (char === '*') {
                      output.push(leftRes[j] * rightRes[k]);
                  }
              }
          }
      }
  }
  
  if (!output.length) {
      output.push(parseInt(string));
  }
  
  memo[string] = output;
  return output;
}

