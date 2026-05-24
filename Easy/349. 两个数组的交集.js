const set_intersection = (set1, set2) => {
  if (set1.size > set2.size) {
    return set_intersection(set2, set1);
  }
  const intersection = new Set();
  for (const num of set1) {
    if (set2.has(num)) {
      intersection.add(num);
    }
  }
  return [...intersection];
}

var intersection = function (nums1, nums2) {
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  return set_intersection(set1, set2);
};

// 就是共同有的元素
var intersection = function (nums1, nums2) {
  nums1.sort((x, y) => x - y);//排序
  nums2.sort((x, y) => x - y);
  //双指针
  let length1 = nums1.length, length2 = nums2.length, index1 = 0, index2 = 0, intersection = new Set();
  while (index1 < length1 && index2 < length2) {//双指针遍历数组
    const num1 = nums1[index1], num2 = nums2[index2];
    if (num1 === num2) {//如果两个指针指向的元素相等 就是其中一个交集
      //防止重复加入
      intersection.add(num1);
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


var intersection = function (nums1, nums2) {
  const map = {}, ans = new Set();
  nums1.forEach(element => {
    map[element] = true;
  });
  nums2.forEach(element => {
    if (map[element]) {
      ans.add(element);
    }
  });
  return [...ans]; //数组去重
}