/*
 * @lc app=leetcode id=1209 lang=javascript
 *
 * [1209] Remove All Adjacent Duplicates in String II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */

// 1. 暴力解法
let removeDuplicates = function (s, k) {
  let result = s.slice(), length = -1
  // 如果字符串长度有变化，则继续循环
  while (length != result.length) {
    // 更新新的长度
    length = result.length;
    // 遍历字符串，遍历的过程中找到重复的k个字符
    for (let i = 0, count = 1; i < result.length; ++i) {
      // 如果是指针指向第一个元素，或者当前元素和前一个元素不相同，则count = 1
      if (i == 0 || result.charAt(i) != result.charAt(i - 1)) {
        count = 1;
      } else if (count == k) {
        //如果count == k，则删除i-k+1到i+1之间的元素
        result = result.substring(0, i - k + 1) + result.substring(i + 1);
        break;
      }

      count += 1;
    }
  }

  console.log(result);

  return result;
};

// 2. Memorize count
var removeDuplicates2 = function (s, k) {
  // count[i] 表示 result[i] 位置的字符连续出现了多少次
  let count = new Array(s.length).fill(0);

  for (let i = 0; i < s.length; ++i) {
    // 如果是指针指向第一个元素，或者当前元素和前一个元素不相同，则count[i] = 1
    if (i == 0 || s[i] != s[i - 1]) {
      count[i] = 1;
    } else {
      // 如果当前元素和前一个元素相同，则count[i] = count[i-1] + 1
      count[i] = count[i - 1] + 1;
      // 如果count[i] == k，则删除i-k+1到i+1之间的元素
      if (count[i] == k) {
        // 删除i-k+1到i+1之间的元素 slice(start, end) end不包含在内
        s = s.slice(0, i - k + 1) + s.slice(i + 1);
        // 删除count as well (这一步可有可无，因为反正是覆盖了) splice(start, deleteCount)
        count.splice(i - k + 1, k);
        // 删除后，指针指向i-k
        i = i - k;
      }
    }
  }

  return s;
};

// 2. Stack
let removeDuplicates3 = function (s, k) {
  let result = s.split(""), counts = [];
  for (let i = 0; i < result.length; ++i) {
    // 如果是指针指向第一个元素，或者当前元素和前一个元素不相同，则stack push 1
    if (i == 0 || result[i] != result[i - 1]) {
      counts.unshift(1);
    } else {
      // 如果当前元素和前一个元素相同，则stack pop 然后 + 1
      let incremented = counts.shift() + 1;
      // 如果incremented == k，则删除i-k+1到i+1之间的元素
      if (incremented == k) {
        result.splice(i - k + 1, k);
        // 删除后，指针指向i-k
        i = i - k;
      } else {
        // 如果incremented < k，则stack push incremented
        counts.unshift(incremented);
      }
    }
  }
  return result.join("");
};

// 3. 双指针
let removeDuplicates4 = function (s, k) {
  let result = s.split(""), counts = [], write = 0, read = 0;

  while (read < result.length) {
    // 回退write指针，覆盖当前元素
    result[write] = result[read];
    // 如果是指针指向第一个元素，或者当前元素和前一个元素不相同，则counts[write] = 1
    if (write == 0 || result[write] != result[write - 1]) {
      counts[write] = 1;
    } else {
      // 如果当前元素和前一个元素相同，则counts[write] = counts[write - 1] + 1
      counts[write] = counts[write - 1] + 1;
      // 如果counts[write] == k，则删除i-k+1到i+1之间的元素
      if (counts[write] == k) {
        // 回退write指针，相当于删除（覆盖）k个元素
        write = write - k;
      }
    }

    read += 1;
    write += 1;
  }

  // write 表示最终结果的长度
  return result.slice(0, write).join("");
};



// Main Test
// removeDuplicates("deeedbbcccbdaa", 3);
// @lc code=end

// 练习. 暴力解法 超出时间限制
var removeDuplicates6 = function (s, k) {
  let count = 0, index = 0, flag = true, current = s[0];

  while (flag) {
    if (index == s.length - 1) {
      flag = false;
    }

    if (s[index] !== current) {
      current = s[index];
      count = 1;
    } else {
      count += 1;
    }


    if (count == k) {
      s = s.substring(0, index - k + 1) + s.substring(index + 1);
      index = 0;
      count = 0;
      current = s[0];
    } else {
      index += 1;
    }
  }


  console.log(s);
  return s;
}

// 往回看 memorize count
var removeDuplicates7 = function (s, k) {
  let memorize = new Array(s.length).fill(0), index = 0;
  while (index < s.length) {
    if (index + 1 - k < 0) {
      index += 1;
      continue;
    }




    index += 1;
  }
}