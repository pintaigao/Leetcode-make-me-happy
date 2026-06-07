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

// 1.回溯DFS的方法
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
  function traveler(path, start) {
    if (!isUniqueChars(path)) {
      return;
    }

    result = Math.max(path.length, result);

    if (start >= arr.length) {
      return;
    }

    // for (let i = start; i < arr.length; i++) {
    //   dfs(path + arr[i], start + 1);
    // }

    traveler(path + arr[start], start + 1); // 选
    traveler(path, start + 1); // 不选
    /*
     * "" -> "cha" --> "cha" + "r" --> "cha" + "r" + "act" -> "cha" + "r" + "act" + "ers" -->
     * "cha" + "r" + "ers" --> "cha" + "act" --> "cha" + "act" + "ers"
     * "cha" + "ers"
     * "" -> "" + "r" -> "r" + "act" -> "r" + "act" + "ers" -> "r" + "ers" ...
     * 然后就这个顺序,每个组合都检查一遍是不是isUniqueChar
     */
  };

  traveler("", 0);
  return result;
};

maxLength2(["cha", "r", "act", "ers"]);
// @lc code=end


var maxLength2 = function (arr) {
  // 过滤掉包含重复字符的字符串
  arr = arr.filter(str => new Set(str).size === str.length); // 将字符串转为集合, 如果集合大小等于字符串长度，说明无重复字符
  let maxLen = 0, currentStringSet = new Set(); // 初始化最大长度为 0, 当前已选字符的集合
  const backtrack = (index) => {
    maxLen = Math.max(maxLen, currentStringSet.size); // 更新最大长度
    for (let i = index; i < arr.length; i++) { // 遍历剩余字符串
      let strSet = new Set(arr[i]), hasConflict = false; // 当前字符串的字符集合 // 标记是否有冲突
      // 检查当前字符串和 currentSet 是否有重复字符
      for (let char of strSet) {
        if (currentStringSet.has(char)) {
          hasConflict = true; // 如果currentSet中有当前字符串的字符，说明有冲突
          break; // 退出循环
        }
      }
      if (!hasConflict) {
        // 将当前字符串加入组合，并递归处理下一个字符串
        // for (const char of strSet) {
        //   currentSet.add(char); // 添加字符到 currentSet
        // }
        currentStringSet = new Set([...currentStringSet, ...strSet]); // more simple way to do the same thing
        backtrack(i + 1); // 递归调用
        // 回溯时移除当前字符串的字符
        for (const char of strSet) { currentStringSet.delete(char) }
        // currentSet = new Set([...currentSet].filter(char => !strSet.has(char))); // more simple way to do the same thing
      }
    }
  };
  backtrack(0); // 从第一个字符串开始回溯
  return maxLen; // 返回最大长度
};