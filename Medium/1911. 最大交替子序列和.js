// 快的方法
var maxAlternatingSum = function (nums) {
  let even = 0;
  let odd = 0;

  for (let num of nums) {
    let newEven = Math.max(even, odd + num);
    let newOdd = Math.max(odd, even - num);
    even = newEven;
    odd = newOdd;
  }

  return even;
};

// DFS 的方法
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAlternatingSum = function (nums) {
  const memo = new Map();

  function dfs(index, isEven) {
    if (index === nums.length) return 0;

    const key = index + "," + isEven;
    if (memo.has(key)) return memo.get(key);

    const skip = dfs(index + 1, isEven);

    const take =
      (isEven ? nums[index] : -nums[index]) +
      dfs(index + 1, !isEven);

    const res = Math.max(skip, take);
    memo.set(key, res);

    return res;
  }

  return dfs(0, true);
};