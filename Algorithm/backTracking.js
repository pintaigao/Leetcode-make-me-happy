var permuteRepeat = function (nums) {
  let res = [], track = [];

  backtrack(nums, track, res);
  return res;
};

// 回溯算法核心函数
var backtrack = function (nums, track, res) {
  // base case，到达叶子节点
  if (track.length === nums.length) {
    // 收集叶子节点上的值
    res.push([...track]);
    return;
  }

  // 回溯算法标准框架
  for (let i = 0; i < nums.length; i++) {
    // 做选择
    track.push(nums[i]);
    // 进入下一层回溯树
    backtrack(nums, track, res);
    // 取消选择
    track.pop();
  }
};

// nums = [1, 2, 3] => 输出是 3^3 = 27 种可能的组合：
/*
[
  [1,1,1],[1,1,2],[1,1,3],[1,2,1],[1,2,2],[1,2,3],[1,3,1],[1,3,2],[1,3,3],
  [2,1,1],[2,1,2],[2,1,3],[2,2,1],[2,2,2],[2,2,3],[2,3,1],[2,3,2],[2,3,3],
  [3,1,1],[3,1,2],[3,1,3],[3,2,1],[3,2,2],[3,2,3],[3,3,1],[3,3,2],[3,3,3]
]
*/