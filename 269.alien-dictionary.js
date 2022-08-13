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
var alienOrder = function (words) {
  //1.构建图，这一步的目的是，将每个字母作为key放入到map中，然后它们的value是排在比key字母后的字母
  let map = {};
  // 每两个两个比较
  for (let i = 0; i < words.length - 1; i++) {
    for (let j = 0; j < words[i].length; j++) {
      //预防“abc”,"ab"的这种情况
      if (j >= words[i + 1].length()) return "";
      //如果字符相同，比较下一个
      if (words[i][j] == words[i + 1][j]) continue;
      //保存第一个不同的字符顺序，每一个key（代表字母），它的value表示排在她后面的字母
      let set = map[words[i][j]] || new Set();
      set.add(words[i + 1][j]);
      map[words[i][j]] = set;
      break;
    }
  }
  console.log(map);

  //2.拓扑排序
  //创建保存入度的数组
  let degrees = new Array(26).fill(-1);

  //注意，不是26字母都在words中出现，所以出度分为两种情况：没有出现的字母出度为-1，出现了的字母的出度为非负数
  for (let word of words) {
    //将出现过的字符的出度设定为0
    for (let c of [...word]) degrees[c.charCodeAt() - "a".charCodeAt()] = 0;
  }

  for (let key of Object.keys(map)) {
    for (let val of map[key]) {
      degrees[val.charCodeAt() - "a".charCodeAt()]++;
    }
  }

  //创建StringBuilder保存拓扑排序 & 创建一个Queue保存入度为0的节点 & 计算图中节点数
  let [sb, list, count] = [[], [], 0];

  for (let i = 0; i < 26; i++) {
    if (degrees[i] != -1) count++;
    if (degrees[i] == 0) {
      //为0，表示排在头,把这个字母push进list
      list.push(String.fromCharCode("a".charCodeAt() + i));
    }
  }

  // 从排在头的开始
  while (list.length) {
    let cur = list.shift();
    sb.push(cur);
    //将邻接点出度-1
    if (map.hasOwnProperty(cur)) {
      for (let c of map[cur]) {
        degrees[c.charCodeAt() - "a".charCodeAt()]--;
        if (degrees[c.charCodeAt() - "a".charCodeAt()] == 0) list.push(c);
      }
    }
  }

  //判断是否有环，理想情况下所有的都loop到
  if (sb.length != count) return "";
  else return sb.join("");
};

console.log(alienOrder(["abc", "ab"]));
// @lc code=end
