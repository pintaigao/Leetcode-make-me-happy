/*
 * @lc app=leetcode id=267 lang=javascript
 *
 * [267] Palindrome Permutation II
 */
/**
 * @param {string} s
 * @return {string[]}
 */
var generatePalindromes = function (s) {
  //count char
  let map = {};
  for (let char of s) {
    let currentCount = map[char] == undefined ? 0 : map[char];
    map[char] = currentCount + 1;
  }

  console.log(map);

  //get the midpoint character
  let midpoint = "",
    permutationArr = [];

  for (let key in map) {
    let curCount = map[key];
    while (curCount >= 2) {
      permutationArr.push(key);
      curCount -= 2;
    }
    if (curCount == 1) {
      if (midpoint != "") {
        return [];
      }
      midpoint = key;
    }
  }

  console.log(midpoint);
  console.log(permutationArr);

  let ret = [];
  let used = [];
  let cur = [];
  let len = permutationArr.length;

  //helper function for backtracking
  const helper = (pos) => {
    if (pos == len) {
      ret.push(cur.slice());
      return;
    }

    for (let i = 0; i < len; i++) {
      if (used[i]) {
        continue;
      }

      if (i > 0 && permutationArr[i - 1] == permutationArr[i] && !used[i - 1]) {
        // 防止[a,a,b]到第二个a的时候，从第一个a开始再排重复的一次
        continue;
      }

      used[i] = true;
      cur.push(permutationArr[i]);

      helper(pos + 1);

      cur.pop();
      used[i] = false;
    }
    return;
  };
  //remaining char used for permutation
  helper(0);
  console.log(ret);

  let result = [];
  //reverse and add to res
  for (let el of ret) {
    let cur = el.join("");
    let rev = el.slice().reverse().join("");
    result.push(cur + midpoint + rev);
  }

  console.log(result);
  return result;
};

generatePalindromes("aaaabb");
