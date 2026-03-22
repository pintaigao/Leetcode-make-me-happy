/*
 * @lc app=leetcode id=22 lang=javascript
 *
 * [22] Generate Parentheses
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */

/* 深度优先遍历 */
var generateParenthesis = function (n) {
  let res = [];
  // 特判
  if (n == 0) {
    return res;
  }

  /**
   * @param curStr 当前递归得到的结果
   * @param left   左括号还有几个可以使用
   * @param right  右括号还有几个可以使用
   */
  let dfs = (curStr, left, right) => {
    // 因为每一次尝试，都使用新的字符串变量，所以无需回溯
    // 在递归终止的时候，直接把它添加到结果集即可，注意与「力扣」第 46 题、第 39 题区分
    if (left == 0 && right == 0) {
      res.push(curStr);
      return;
    }

    // 剪枝（如图，左括号可以使用的个数严格大于右括号可以使用的个数，才剪枝，注意这个细节）
    if (left > right) {
      return;
    }

    if (left > 0) {
      dfs(curStr + "(", left - 1, right);
    }

    if (right > 0) {
      dfs(curStr + ")", left, right - 1);
    }
  };

  // 执行深度优先遍历，搜索可能的结果
  dfs("", n, n);
  return res;
};

/* 严格意义上的回溯形式 */
var generateParenthesis = function (n) {
  let res = [];
  if (n == 0) {
    return res;
  }

  let dfs = function (path, left, right) {
    if (left == 0 && right == 0) {
      // path.slice() 生成了一个新的字符串，相当于做了一次拷贝，这里的做法等同于「力扣」第 46 题、第 39 题
      res.push(path.slice());
      return;
    }

    // 剪枝（如图，左括号可以使用的个数严格大于右括号可以使用的个数，才剪枝，注意这个细节）
    // 如果左括号的剩余数量大于右括号的剩余数量，说明())),再往下走左括号的数量不能匹配右括号的数量了
    if (left > right) {
      return;
    }

    if (left > 0) {
      path += "(";
      dfs(path, left - 1, right, res);
      // 删除最后一个char
      path = path.substring(0, path.length - 1);
    }

    if (right > 0) {
      path += ")";
      dfs(path, left, right - 1, res);
      path = path.substring(0, path.length - 1);
    }
  };

  dfs("", n, n);
  return res;
};

/* 广度优先遍历 */
class Node {
  constructor(L, R, res) {
    this.left = L;
    this.right = R;
    this.res = res;
  }
}
var generateParenthesis = function (n) {
  let ans = [];
  let queue = [];
  queue.push(new Node(0, 0, ""));
  while (queue.length) {
    let node = queue.shift();
    const { left, right, res } = node;
    if (left === n && right === n) ans.push(res);
    if (left < n) queue.push(new Node(left + 1, right, res + "("));
    if (right < n && left > right) queue.push(new Node(left, right + 1, res + ")"));
  }
  return ans;
};

// @lc code=end
