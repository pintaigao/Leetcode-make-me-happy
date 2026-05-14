/*
 * @lc app=leetcode id=406 lang=javascript
 *
 * [406] Queue Reconstruction by Height
 */

// @lc code=start
/**
 * @param {number[][]} people
 * @return {number[][]}
 */

/* Solution 1: Greedy */
var reconstructQueue = function (people) {
  // 两个array比较，先按高度降序排序，如果高度[0]相同，人少[1]的放前面
  // [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]] ==> [[7,0], [7,1], [6,1],[5,0],[5,2],[4,4]]
  people.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);

  let output = [];
  for (let p of people) {
    // 在p[1]的位置插入p
    // 先按照身高从大到小排序（身高相同的情况下K小的在前面），这样的话，无论哪个人的身高都小于等于他前面人的身高。所以接下来只要按照K值将他插入相应的位置就可以了。
    output.splice(p[1], 0, p);
  }
  return output;
};
// @lc code=end

var reconstructQueue = function (people) {
  // 按照身高从高到低排序，如果身高相同，按照 k 从小到大排序
  people.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    }
    return b[0] - a[0];
  });

  insertSort(people);
  return people;
};

// 对标准插入排序的比较逻辑稍作修改
// https://labuladong.online/algo/data-structure-basic/insertion-sort/
var insertSort = function (people) {
  let n = people.length;
  let sortedIndex = 0;
  while (sortedIndex < n) {
    for (let i = sortedIndex; i > 0; i--) {
      // 我们将第 i 个人向前移动
      // 现在这个人前面有 i（不是 i-1，因为索引从 0 开始）个比他高的人
      // 他的目标是前面有 k 个比他高的人，所以把他往前移动
      let k = people[i][1];
      if (k < i) {
        // swap(nums[i], nums[i - 1])
        let tmp = people[i];
        people[i] = people[i - 1];
        people[i - 1] = tmp;
      } else {
        break;
      }
    }
    sortedIndex++;
  }
};
