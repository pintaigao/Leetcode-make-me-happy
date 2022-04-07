/*
 * @lc app=leetcode id=1239 lang=javascript
 *
 * [1239] Maximum Length of a Concatenated String with Unique Characters
 */

// @lc code=start
/**
 * @param {string[]} arr
 * @return {number}
 */
var maxLength = function (arr) {
  // isUnique的做法：就是【26】，碰到的就true，再碰一次就return false
  let used = new Set();

  let isUnique = function (str) {
    if (str.length > 26) return false;
    for (let ch in str.split("")) {
      if (used.has(ch)) {
        return false;
      } else {
        used.add(ch);
      }
    }
    return true;
  };

  let res = [];
  res.push("");

  // 获得所有的组合
  for (let str of arr) {
    if (!isUnique(str)) continue;
    let resList = [];
    for (let candidate of res) {
      let temp = candidate + str;
      used = new Set();
      if (isUnique(temp)) resList.push(temp);
    }
    res = [...res, ...resList];
  }

  // 返回res中最长的长度 Math.max(...res.map((str) => str.length));
  let ans = 0;
  for (let str of res) ans = Math.max(ans, str.length);
  return ans;
};

// 2.回溯DFS的方法
let maxLength2 = function (arr) {
  if (arr == null || arr.length == 0) {
    return 0;
  }

  // 判断s里面的字符是否唯一
  let isUniqueChars = function (s) {
    let set = new Set();
    for (let c of s.split("")) {
      if (set.has(c)) {
        return false;
      }
      set.add(c);
    }
    return true;
  };

  let result = 0;
  // 组合
  let dfs = function (path, idx) {
    let isUniqueChar = isUniqueChars(path);

    if (isUniqueChar) {
      result = Math.max(path.length, result);
    }
    if (idx == arr.length || !isUniqueChar) {
      return;
    }

    for (let i = idx; i < arr.length; i++) {
      dfs(path + arr[i], i + 1);
    }
    /*
     * "" -> "cha" --> "cha" + "r" --> "cha" + "r" + "act" -> "cha" + "r" + "act" + "ers" -->
     * "cha" + "r" + "ers" --> "cha" + "act" --> "cha" + "act" + "ers"
     * "cha" + "ers"
     * "" -> "" + "r" -> "r" + "act" -> "r" + "act" + "ers" -> "r" + "ers" ...
     * 然后就这个顺序,每个组合都检查一遍是不是isUniqueChar
     */
  };

  dfs("", 0);
  return result;
};

maxLength2(["cha", "r", "act", "ers"]);
// @lc code=end
