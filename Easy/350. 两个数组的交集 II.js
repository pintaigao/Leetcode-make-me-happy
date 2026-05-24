/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function (nums1, nums2) {
  nums1.sort((x, y) => x - y);//排序
  nums2.sort((x, y) => x - y);
  //双指针
  let length1 = nums1.length, length2 = nums2.length, index1 = 0, index2 = 0, intersection = [];
  while (index1 < length1 && index2 < length2) {//双指针遍历数组
    const num1 = nums1[index1], num2 = nums2[index2];
    if (num1 === num2) {//如果两个指针指向的元素相等 就是其中一个交集
      //防止重复加入
      intersection.push(num1);
      index1++;
      index2++;
    } else if (num1 < num2) {
      index1++;//num1 < num2说明nums1需要向右移动
    } else {
      index2++;//num1 > num2说明nums2需要向右移动
    }
  }
  return [...intersection];
};

// 就是共同有的元素 但是重复的元素也要算, map记录每个元素出现的次数, 交集就是两者都出现的元素, 出现的次数是两者出现次数的最小值
var intersect2 = function (nums1, nums2) {
  const map = {}, result = [];
  for (let num of nums1) {
    if (map[num]) {
      map[num]++;
    } else {
      map[num] = 1
    }
  }
  for (let num of nums2) {
    if (map[num] > 0) {
      result.push(num);
      map[num]--
    }
  }
  return result;
}