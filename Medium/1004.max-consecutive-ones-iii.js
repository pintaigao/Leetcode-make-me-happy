/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// Sliding Window, Two Pointers
// 对于每个 A[j]，尝试找到最长的子数组。
// If A[i] ~ A[j] has zeros <= K, we continue to increment j.
// 如果 A[i] ~ A[j] 包含的 0 <= K，那么我们继续增加 j。
// If A[i] ~ A[j] has zeros > K, we increment i (as well as j).
// 如果 A[i] ~ A[j] 包含的 0 > K，那么我们继续增加 i (as well as j)。
var longestOnes = function (A, K) {
  // 设立两个指针
  let left = 0, right = 0, result = 0;
  for (right = 0; right < A.length; right++) {
    // 如果我们在窗口中包含了 0，那么我们减少了 K 的值。
    // 由于 K 是窗口中允许的最大的零的数量。
    if (A[right] == 0) K -= 1;
    // 如果 K < 0，窗口中的零的数量大于允许的零的数量，因此left往右移。
    if (K < 0) {
      // 如果 left 指向的元素是 0，那么我们增加 K 的值，因为我们将这个 0 移出了窗口。
      if (A[left] == 0) K += 1;
      // 移动 left 指针以缩小窗口。
      left += 1;
    }
    // 更新结果
    result = Math.max(result, right - left + 1);
  }
  return result;
};

// Sliding Window 更好懂的方法
let longestOnes2 = function (nums, k) {
  let maxLen = 0;
  // lo hi两个指针
  for (let lo = 0, hi = 0, zeros = 0; hi < nums.length; hi++) {
    // count zeros的数目
    zeros += nums[hi] == 0 ? 1 : 0;
    // 如果zeros > k，那么我们需要抛弃窗口中的最左边的元素,直至窗口内的0的个数小于等于 K 为止。
    if (zeros > k) {
      zeros -= nums[lo] == 0 ? 1 : 0;
      lo++;
    } else {
      maxLen = Math.max(hi - lo + 1, maxLen);
    }
  }
  return maxLen;
};

// 滑动窗口
let longestOnes3 = function (nums, k) {
  // 记录窗口中 1 的出现次数 和 记录结果长度
  let left = 0, right = 0, windowOneCount = 0, res = 0

  // 开始滑动窗口模板
  while (right < nums.length) {
    // 扩大窗口
    if (nums[right] == 1) {
      windowOneCount++;
    }
    right++;

    while (right - left - windowOneCount > k) {
      // 当窗口中需要替换的 0 的数量大于 k，缩小窗口
      if (nums[left] == 1) {
        windowOneCount--;
      }
      left++;
    }
    // 此时一定是一个合法的窗口，求最大窗口长度
    res = Math.max(res, right - left);
  }
  return res;
}

// @lc code=end
// 练习
let longestOnes10 = function (nums, k) {
  let left = 0, right = 0, maxLength = 0;

  while (right < nums.length) {
    if (nums[right] === 0) {
      k--;
    }
    right += 1;

    // 不要等到最后一刻才更新 maxLength，因为如果跑完以下，可能窗口已经变了
    if (k >= 0) {
      maxLength = Math.max(maxLength, right - left);
    } else {
      // 收缩窗口，直到窗口内的 0 的数量不超过 k
      while (k < 0) {
        if (nums[left] === 0) {
          k += 1;
        }
        left += 1;
      }
    }
  }

  return maxLength;
}

// 硬要用 if(nums[right] === 1) 来统计窗口内 1 的数量
var longestOnes = function (nums, k) {
  let left = 0;
  let right = 0;
  let remainingK = k;
  let res = 0;

  while (right < nums.length) {
    if (nums[right] === 1) {
      // 1 永远可以进窗口
      right++;
    } else {
      // nums[right] === 0
      if (remainingK > 0) {
        // 还有翻转次数，这个 0 可以进窗口
        remainingK--;
        right++;
      } else {
        // 没有翻转次数了，需要移动 left，直到释放一个 0
        while (nums[left] !== 0) {
          left++;
        }

        // 跳过这个旧的 0，相当于释放一次翻转额度
        left++;
        remainingK = remainingK + 1

        // 当前 nums[right] 这个 0 使用刚释放出来的额度
        // remainingK 先 +1 再 -1，抵消了，所以不用改
        right++;
        remainingK = remainingK - 1
      }
    }

    res = Math.max(res, right - left);
  }

  return res;
};