/*
 * @lc app=leetcode id=394 lang=javascript
 *
 * [394] Decode String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
/* 栈 */
var decodeString = function (s) {
  // 用两个栈来存放当前状态，前者是重复次数，后者是累积字符串
  //拼接字符串
  //表示重复次数
  let [repetStack, resStack, resStr, repet] = [[], [], "", 0];
  // 遍历s
  for (let i = 0; i < s.length; i++) {
    if (s[i] == "[") {
      //双双压入栈中,保存当前状态
      repetStack.push(repet);
      resStack.push(resStr);
      //置空，准备下面的累积
      repet = 0;
      // 准备用resStr记录括号里面的字符串
      resStr = "";
    } else if (s[i] == "]") {
      // 取出当前重复次数栈中的值，也就是当前字符串的重复次数
      let count = repetStack.pop();
      // 根据重复次数生成重复字符串，赋值给temp，和resStr拼接
      let temp = "";
      for (let i = 0; i < count; i++) {
        temp += resStr;
      }
      // 和前面已经求得的字符串进行拼接
      resStr = resStack.pop() + temp;
    } else if (s[i] >= "0" && s[i] <= "9") {
      // repet累积
      repet = repet * 10 + (s[i] - "0");
    } else {
      //字符累积
      resStr += s[i];
    }
  }
  return resStr;
};

/* 递归的方法 */
let decodeString = function (s) {
  let dfs = (i) => {
    let res = "";
    let repet = 0;
    while (i < s.length) {
      if (s[i] >= "0" && s[i] <= "9") {
        repet = repet * 10 + (s[i] - "0");
      } else if (s[i] == "[") {
        let tmp = dfs(i + 1);
        i = parseInt(tmp[0]);
        while (multi > 0) {
          res += tmp[1];
          multi -= 1;
        }
      } else if (s[i] == "]") {
        return [i, res];
      } else {
        res += s[i];
      }
      i++;
    }
    return [res];
  };

  dfs(0)[0];
};
// @lc code=end
