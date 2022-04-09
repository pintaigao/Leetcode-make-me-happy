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
  let result = s.slice();
  let length = -1;
  while (length != result.length) {
    length = sb.length;
    for (let i = 0, count = 1; i < result.length; ++i) {
      if (i == 0 || result.charAt(i) != result.charAt(i - 1)) {
        count = 1;
      } else if (count++ == k) {
        // result delete from i-k + 1 to i + 1
        result = result.substring(0, i - k + 1) + result.substring(i + 1);
        break;
      }
    }
  }
  return result;
};

// 2. Memorize count
var removeDuplicates2 = function (s, k) {
  let result = s.split("");

  console.log(result);
  let count = new Array(result.length).fill(0);

  for (let i = 0; i < result.length; ++i) {
    // 如果是指针指向第一个元素，或者当前元素和前一个元素不相同，则count[i] = 1
    if (i == 0 || result[i] != result[i - 1]) {
      count[i] = 1;
      console.log(count);
      console.log();
    } else {
      // 如果当前元素和前一个元素相同，则count[i] = count[i-1] + 1
      count[i] = count[i - 1] + 1;
      // 如果count[i] == k，则删除i-k+1到i+1之间的元素
      if (count[i] == k) {
        console.log("Before delete: " + result);
        // 删除i-k+1到i+1之间的元素 splice(start, deleteCount)
        result.splice(i - k + 1, k);
        // 删除count as well (这一步可有可无，因为反正是覆盖了)
        count.splice(i - k + 1, k);
        // 删除后，指针指向i-k
        i = i - k;
      }

      console.log("Come to after splice");
      console.log(result);
      console.log();
    }
  }

  return result.join("");
};

removeDuplicates2("deeedbbcccbdaa", 2);

// 2. Stack
let removeDuplicates3 = function (s, k) {
  let result = s.split("");
  let counts = [];
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

// removeDuplicates("deeedbbcccbdaa", 2);
// @lc code=end
