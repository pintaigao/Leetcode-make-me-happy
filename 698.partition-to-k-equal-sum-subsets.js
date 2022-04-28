/*
 * @lc app=leetcode id=698 lang=javascript
 *
 * [698] Partition to K Equal Sum Subsets
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
/* Solution 1: Back Tracking */
var canPartitionKSubsets = function (nums, k) {
  let [visited, sum] = [new Array(nums.length).fill(false), nums.reduce((a, b) => a + b)];
  if (k <= 0 || sum % k != 0) return false;

  // 平均每组的和
  let target = parseInt(sum / k);

  let canPartition = function (start_index, k, cur_sum) {
    // k = 1 or k=0都可以，因为剩下那组的sum肯定等于target
    if (k == 1) return true;
    // 看剩下的
    if (cur_sum == target) {
      return canPartition(0, k - 1, 0);
    }

    for (let i = start_index; i < nums.length; i++) {
      if (cur_sum + nums[i] <= target && visited[i] == false) {
        visited[i] = true;
        if (canPartition(i + 1, k, cur_sum + nums[i])) {
          return true;
        }
        visited[i] = false;
      }
    }
    return false;
  };

  // 初始化,从index 0开始
  return canPartition(0, k, 0);
};

// Solution 2: sort + dfs
var canPartitionKSubsets = function (nums, k) {
  const [arr, sum] = [new Array(k).fill(0), nums.reduce((a, b) => a + b, 0)];
  if (nums.length < k || sum % k !== 0) return false;
  // 从大到小排序
  let target = parseInt(sum / k);
  nums.sort((a, b) => b - a);

  if (nums[0] > sum) {
    return false;
  }

  const dfs = function (index) {
    if (index === nums.length) return true;

    const set = new Set();

    for (let i = 0; i < k; i++) {
      if (arr[i] + nums[index] > target) continue;
      if (set.has(arr[i])) continue;
      set.add(arr[i]);
      arr[i] += nums[index];
      if (dfs(index + 1)) return true;
      arr[i] -= nums[index];
    }
    return false;
  };

  return dfs(0);
};

// solution 3: https://leetcode-cn.com/problems/partition-to-k-equal-sum-subsets/comments/60262
var canPartitionKSubsets = function (nums, k) {
  let sum = nums.reduce((a, b) => a + b, 0);
  if (nums.length < k || sum % k !== 0) return false;
  // 从大到小排序
  sum = parseInt(sum / k);
  nums.sort((a, b) => a - b);

  if (nums[0] > sum) {
    return false;
  }

  //建立一个长度为k的桶,桶的每一个值都是子集的和
  let arr = new Array(k).fill(sum);

  let help = function (index) {
    //已经遍历到了-1说明前面的所有数都正好可以放入桶里，那所有桶的值此时都为0，说明找到了结果，返回true
    if (index < 0) {
      return true;
    }
    //遍历k个桶
    for (let i = 0; i < k; i++) {
      //如果正好能放下当前的数或者放下当前的数后，还有机会继续放前面的数（剪枝）
      if (arr[i] == nums[index] || (index > 0 && arr[i] - nums[index] >= nums[0])) {
        //放当前的数到桶i里
        arr[i] -= nums[index];
        //开始放下一个数
        if (help(index - 1)) {
          return true;
        }
        //这个数不该放在桶i中
        //从桶中拿回当前的数
        arr[i] += nums[index];
      }
    }
    return false;
  };

  //从数组最后一个数开始进行递归
  return help(nums.length - 1);
};

// Solution 4
var canPartitionKSubsets = function (nums, k) {
  var total = nums.reduce((a, b) => {
    return a + b;
  });

  if (total % k != 0) return false;

  nums.sort((a, b) => {
    return b - a;
  });

  var btotal = total / k;

  var buckets = new Array(k).fill(0);

  return fillBuckets(0);

  function fillBuckets(i) {
    if (i == nums.length) return true;

    for (var j = 0; j < buckets.length; j++) {
      if (nums[i] + buckets[j] <= btotal) {
        buckets[j] += nums[i];

        if (fillBuckets(i + 1)) {
          return true;
        }

        buckets[j] -= nums[i];

        if (buckets[j] == 0) break;
      }
    }

    return false;
  }
};
// @lc code=end
