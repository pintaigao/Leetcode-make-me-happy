// Brute Force
var minWindow = function (s, t) {
  let sArray = s.split(""), tArray = t.split(""), pending = [], result = "";
  let left = 0, right = 0;

  if (s.length < t.length) {
    return "";
  }

  while (right < s.length) {
    pending.push(sArray[right]);
    // 增大窗口
    right++;
    let flag = check();

    // 判断左侧窗口是否要收缩
    while (flag) {
      if (pending.length < result.length || result.length === 0) {
        result = pending.slice().join("");
      }
      pending.shift();
      // 缩小窗
      left++;
      if (!check()) {
        flag = false;
      }
    }
  }

  function check() {
    let flag = true;
    tArray.forEach(char => {
      if (!pending.includes(char)) {
        flag = false;
      }
    });

    return flag;
  };

  console.log(result);
}

minWindow("ADOBECODEBANC", "ABC");

var minWindow2 = function (s, t) {
  // 用合适的数据结构记录窗口中的数据，根据具体场景变通
  // 比如说，我想记录窗口中元素出现的次数，就用 map
  // 如果我想记录窗口中的元素和，就可以只用一个 int
  // 记录最小覆盖子串的起始索引及长度
  let need = {}, window = {}, left = 0, right = 0, valid = 0, start = 0, len = s.length + 1;

  for (let c of t) {
    need[c] = (need[c] || 0) + 1;
  }

  while (right < s.length) {
    // c 是将移入窗口的字符
    let c = s[right];
    // 扩大窗口
    // 进行窗口内数据的一系列更新
    window[c] = (window[c] || 0) + 1;
    if (window[c] === need[c]) {
      valid++;
    }

    right++;

    // 判断左侧窗口是否要收缩
    // valid 满足条件时，说明窗口内已经包含了 t 的所有字符，此时就可以尝试收缩窗口了
    while (valid === Object.keys(need).length) {
      // 在这里更新最小覆盖子串
      if (right - left < len) {
        start = left;
        len = right - left;
      }
      // d 是将移出窗口的字符
      let d = s[left];
      // 缩小窗口
      left++;
      // 进行窗口内数据的一系列更新
      if (window[d] === need[d]) {
        valid--;
      }
      window[d]--;
    }
  }
  // 返回最小覆盖子串
  return len === s.length + 1 ? "" : s.substring(start, start + len);
};

// 练习 It works, but time limit exceeded
var minWindow3 = function (s, t) {
  let need = {}, window = {}, right = 0, valid = 0, sArray = s.split(""), pending = [], result = "";

  for (let c of t) {
    need[c] = (need[c] || 0) + 1;
  }

  while (right < s.length) {
    let c = sArray[right];
    pending.push(c);
    // 增大窗口
    right++;


    if (need[c]) {
      window[c] = (window[c] || 0) + 1;
      if (window[c] === need[c]) {
        valid++;
      }
    }

    // 判断左侧窗口是否要收缩
    while (valid === Object.keys(need).length) {
      if (pending.length < result.length || result.length === 0) {
        result = pending.slice().join("");
      }
      // 缩小窗
      let d = pending.shift();

      if (need[d]) {
        if (window[d] === need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }

  console.log(result);


  return result;
}

minWindow3("ADOBECODEBANC", "ABC");