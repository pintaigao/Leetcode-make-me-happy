var singleNumber = function (nums) {
  let res = 0;
  for (let n of nums) {
    res ^= n;
  }
  return res;
};

var singleNumber = function (nums) {
  const countMap = new Map();
  // 统计次数
  for (let num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }
  // 找次数为 1 的数字
  for (let [num, count] of countMap) {
    if (count === 1) return num;
  }
};