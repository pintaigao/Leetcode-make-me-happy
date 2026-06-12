/*
 * @lc app=leetcode id=1423 lang=javascript
 *
 * [1423] Maximum Points You Can Obtain from Cards
 */

// @lc code=start
/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
// 1.Easy Sliding Window O(n): Find minimum subarray
var maxScore = function (cardPoints, k) {
  // Subarray的长度, n相当于总长度 - 后面 k 个元素
  // 整一个数组的和
  // 左右pointer
  let n = cardPoints.length - k, min = Number.MAX_VALUE, total = 0, cur = 0, l = 0, r = 0;

  while (r < cardPoints.length) { // 想：r 要从最后一位取值吗（即r = [cardPoints.length-1]的时候要执行计算吗，要r < cardPoints.length）
    total += cardPoints[r];
    cur += cardPoints[r];
    if (r - l + 1 == n) { // 当【0，r】长度 + 后面 k个元素 = 总长 即现在【0，r】长度 = 总长-后面 k 个元素 
      min = Math.min(min, cur);
      cur -= cardPoints[l];
      l += 1;
    }
    r += 1;
  }

  return total - (min == Number.MAX_VALUE ? 0 : min);
};

// 按照我的理解的Solution 1
var maxScore2 = function (cardPoints, k) {
  // Subarray的长度
  let n = cardPoints.length - k;
  let min = Number.MAX_VALUE;
  // 整一个数组的和
  let arraySum = cardPoints.reduce((a, b) => a + b, 0);
  let cur = 0;
  // 左右pointer
  let l = 0;
  let r = 0;

  while (r < cardPoints.length) {
    cur += cardPoints[r];
    if (r - l + 1 == n) {
      min = Math.min(min, cur);
      cur -= cardPoints[l];
      l += 1;
    }
    r += 1;
  }

  return arraySum - (min == Number.MAX_VALUE ? 0 : min);
};

// 2.跟上面的相似，sliding window在前k个和后k个中滑 O(k)
let maxScore3 = function (cardPoints, k) {
  let sum = 0; // window: start = 0; end = k;

  // 前k个的sum
  for (let i = 0; i < k; i++) {
    sum += cardPoints[i];
  }

  let newSum = sum; // window: start = 0; end = k;

  for (let end = k - 1; end >= 0; end--) {
    //sliding window left => start = -1
    // 减去前k个的最后一个
    newSum -= cardPoints[end];
    // 加上后k个的第一个
    newSum += cardPoints[cardPoints.length - (k - end)];
    // 比较
    sum = Math.max(sum, newSum);
  }
  return sum;
};

// maxScore([1, 79, 80, 1, 1, 1, 200, 1], 3);

// 3.我能看懂的
let maxScore4 = function (cardPoints, k) {
  let sum = 0, cardPointsSize = cardPoints.length;
  for (let i = 0; i < k; ++i) sum += cardPoints[i];
  let m = sum;
  for (let i = 0; i < k; ++i) {
    sum += cardPoints[cardPointsSize - 1 - i] - cardPoints[k - 1 - i];
    m = Math.max(sum, m);
  }
  return m;
};

// @lc code=end

// 练习
var maxScore5 = function (cardPoints, k) {
  if (k == 0) {
    return 0;
  }

  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += cardPoints[i];
  }

  let newSum = sum, counter = 1;

  while (counter <= k) {
    newSum = newSum - cardPoints[k - counter] + cardPoints[cardPoints.length - counter];
    sum = Math.max(sum, newSum);
    counter += 1;
  }

  console.log(sum);

  return sum;
}

maxScore5([1, 79, 80, 1, 1, 1, 200, 1], 3);

