/*
 * @lc app=leetcode id=923 lang=javascript
 *
 * [923] 3Sum With Multiplicity
 */

// @lc code=start
/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */

/* 三指针的做法 */
var threeSumMulti = function (arr, target) {
  // 0 <= arr[i] <= 100
  let [MOD, keys, count, ans] = [10 ** 9 + 7, new Set(), new Array(101).fill(0), 0];
  for (let x of arr.sort((a, b) => a - b)) {
    // 每个数只出现一次所组成的数组
    keys.add(x);
    count[x]++;
  }
  keys = [...keys];
  for (let i = 0; i < keys.length; ++i) {
    // j可以从x开始，不是要从x的下一个开始，k从最后一个开始
    let [x, T, j, k] = [keys[i], target - keys[i], i, keys.length - 1];
    while (j <= k) {
      let [y, z] = [keys[j], keys[k]];
      // if 和 else if先判断哪些组合能够成target
      if (y + z < T) {
        j++;
      } else if (y + z > T) {
        k--;
      } else {
        // # x+y+z == T, now calc the size of the contribution
        if (i < j && j < k) {
          ans += count[x] * count[y] * count[z];
        } else if (i == j && j < k) {
          ans += ((count[x] * (count[x] - 1)) / 2) * count[z];
        } else if (i < j && j == k) {
          ans += (count[x] * count[y] * (count[y] - 1)) / 2;
        } else {
          // i == j == k
          ans += (count[x] * (count[x] - 1) * (count[x] - 2)) / 6;
        }
        // 找到target后j右移k左移
        j++;
        k--;
      }
    }
  }

  return ans % MOD;
};

console.log(threeSumMulti([2, 1, 3]));

// @lc code=end
