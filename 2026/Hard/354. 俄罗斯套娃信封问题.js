/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  envelopes.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);

  console.log(envelopes);


  let dp = new Array(envelopes.length).fill(1);

  for (let i = 0; i < envelopes.length; i++) {
    for (let j = 0; j < i; j++) {
      if (envelopes[i][0] > envelopes[j][0] && envelopes[i][1] > envelopes[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return lengthOfLIS(dp);

};

var lengthOfLIS = function (nums) {
  let piles = 0, n = nums.length;
  let top = new Array(n);
  for (let i = 0; i < n; i++) {
    // 要处理的扑克牌
    let poker = nums[i];
    let left = 0, right = piles;
    // 二分查找插入位置
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (top[mid] >= poker)
        right = mid;
      else
        left = mid + 1;
    }
    if (left === piles) piles++;
    // 把这张牌放到牌堆顶
    top[left] = poker;
  }
  // 牌堆数就是 LIS 长度
  console.log(piles);

  return piles;
}

maxEnvelopes([[15, 8], [2, 20], [2, 14], [4, 17], [8, 19], [8, 9], [5, 7], [11, 19], [8, 11], [13, 11], [2, 13], [11, 19], [8, 11], [13, 11], [2, 13], [11, 19], [16, 1], [18, 13], [14, 17], [18, 19]]);

