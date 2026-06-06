/**
 * @param {number[]} arr - 输入的数组
 * @param {number} k - 分割的最大长度
 * @return {number} - 返回最小的子数组和
 */
var maxSumAfterPartitioning = function (arr, k) {
  // [1,15,7,9,2,5,10],  => [[1,15], [7,9]] => [[1], [15,7,9]]
  // [[1, 15, 7], [9]] dp[i] 中的值表示arr[0...i] 这前 i 个数，能得到的最大 sum, 所以当新的一个数j加入后，假设以它结尾[j], 假设以[j-1, j]结尾，假设以[j-k+1...j-1,j]结尾，分别计算这三种情况的最大值，取其中的最大值更新dp[i]的值
  // [j]结尾，dp[j] = dp[j-1] + arr[j]
  // [j-1, j]结尾，dp[j] = dp[j-2] + max(arr[j-1], arr[j]) * 2
  // [j-k+1...j-1,j]结尾，dp[j] = dp[j-k] + max(arr[j-k+1], ..., arr[j]) * k
  // 数组的长度
  // 初始化dp数组，长度为n，每个元素初始值为0
  const n = arr.length, dp = new Array(n).fill(0);

  // 遍历数组的每个元素
  for (let i = 0; i < n; i++) {
    let max = 0; // 当前子数组的最大值

    // j 代表的是末尾子数组的数字个数，最多为k，最少为1
    // 遍历子数组的长度，从1到k,i-j+1 为末尾子数组的起始位置，确保起始位置不越界
    for (let j = 1; j <= k && i - j + 1 >= 0; j++) {
      max = Math.max(max, arr[i - j + 1]); // 更新当前子数组的最大值
      dp[i] = Math.max(dp[i], (i >= j ? dp[i - j] : 0) + max * j); // 更新dp[i]的值
    }
  }

  return dp[n - 1]; // 返回dp数组的最后一个元素，即最终结果
};

// Top Down 的DP， 含义：从 start 开始，后面怎么切最好？
var maxSumAfterPartitioning = function (arr, k) {
  const n = arr.length, memo = new Array(n).fill(undefined);
  function dfs(start) {
    // base case: 已经走到数组末尾
    if (start === n) return 0;
    // 如果之前算过，直接返回
    if (memo[start] !== undefined) {
      return memo[start];
    }
    let res = 0, maxVal = 0;
    // 枚举第一段的长度
    for (let len = 1; len <= k && start + len <= n; len++) {
      // 当前段是 arr[start ... start + len - 1]
      maxVal = Math.max(maxVal, arr[start + len - 1]);
      const current = maxVal * len + dfs(start + len);
      res = Math.max(res, current);
    }
    memo[start] = res;
    return res;
  }
  return dfs(0);
};

// 练习
var maxSumAfterPartitioning10 = function (arr, k) {
  // value, index map
  let map = {};
  for (let i = 0; i < arr.length; i++) {
    map[arr[i]] = i;
  }

  arr.sort((a, b) => a - b);
  let length = arr.length;
  let res = [];
  let remain = length;


  for (let i = length - 1; i >= 0; i--) {
    remain = res.length + k <= length ? k : length - res.length;
    let temp = []
    for (let j = 0; j < remain; j++) {
      temp.push(arr[i]);
    }


    // put to the right position
    if (!res.length) {
      res = res.concat(temp)
    } else {
      let index = 0;
      while (index < res.length) {
        if (map[res[index]] < map[arr[i]]) {
          index += 1
        } else {
          res.splice(index == 0 ? index : index, 0, ...temp);
          break;
        }
      }

      if (index == res.length) {
        res = [...res, ...temp]
      }
    }

    if (res.length === length) {
      break;
    }
  }

  return res;
};

maxSumAfterPartitioning10([1, 4, 1, 5, 7, 3, 6, 1, 9, 9, 3], 4)