/**
 * @param {string} s
 * @return {number}
 */

var longestPalindrome = function (s) {
  let temp = new Set(), sum = 0
  s.split("").forEach(c => {
    if (temp.has(c)) {
      temp.delete(c)
      sum += 2;
    } else {
      temp.add(c)
    }
  })
  return sum + (temp.size > 0 ? 1 : 0);
};

var longestPalindrome2 = function (s) {
  var countObj = {}, res = 0;//最大
  for (var i = 0; i < s.length; i++) {
    if (!countObj[s[i]]) {
      countObj[s[i]] = 1;
    } else {
      res += 2;
      delete countObj[s[i]];
    }
  }
  if (s.length > res) { //剩余存在奇个数字符
    res += 1;
  }
  return res;
}

var longestPalindrome3 = function (s) {
  let len = s.length, map = new Map(), ans = 0, mark = false;
  for (let i = 0; i < len; i++) {
    map.set(s[i], map.has(s[i]) ? map.get(s[i]) + 1 : 1)
  }

  console.log(map);

  for (let item of map) {
    console.log(item);

    if (item[1] % 2 == 0) {
      ans += item[1]
    } else {
      // 奇数
      ans += item[1] > 1 ? (item[1] - 1) : 0;
      mark = true;
    }
  }



  return mark ? ans + 1 : ans
};

longestPalindrome3("abccccdd")