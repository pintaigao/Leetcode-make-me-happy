/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  // 记录 nums2 中每个元素的下一个更大元素
  let greater = calculateNextGreaterElement(nums2);
  // 转化成映射：元素 x -> x 的下一个最大元素
  let greaterMap = new Map();
  for (let i = 0; i < nums2.length; i++) {
    greaterMap.set(nums2[i], greater[i]);
  }
  // nums1 是 nums2 的子集，所以根据 greaterMap 可以得到结果
  let res = new Array(nums1.length);
  for (let i = 0; i < nums1.length; i++) {
    res[i] = greaterMap.get(nums1[i]);
    // res[i] = greater[nums2.indexOf(nums1[i])];
  }

  return res;
};

// 计算 nums 中每个元素的下一个更大元素
var calculateNextGreaterElement = function (nums) {
  let n = nums.length;
  // 存放答案的数组
  let res = new Array(n);
  let s = [];
  // 倒着往栈里放
  for (let i = n - 1; i >= 0; i--) {
    // 判定个子高矮
    while (s.length > 0 && s[s.length - 1] <= nums[i]) {
      // 矮个起开，反正也被挡着了。。。
      s.pop();
    }
    // nums[i] 身后的下一个更大元素
    res[i] = s.length === 0 ? -1 : s[s.length - 1];
    s.push(nums[i]);
  }
  return res;
};