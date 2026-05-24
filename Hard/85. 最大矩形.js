// 暴力的方法
var maximalRectangle = function (matrix) {
  let m = matrix.length, n = matrix[0].length, left = new Array(matrix.length).fill(0).map(() => new Array(matrix[0].length).fill(0)), ret = 0;
  if (m === 0) {
    return 0;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '1') {
        left[i][j] = (j === 0 ? 0 : left[i][j - 1]) + 1;
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '0') {
        continue;
      }
      let width = area = left[i][j];
      // And then we can compute the area of the rectangle with the current position as the bottom-right corner, and we can extend it upwards
      for (let k = i - 1; k >= 0; k--) {
        // 当前这个位置的宽度是由上面这个位置的宽度决定的
        // We can only extend the rectangle upwards if the width of the rectangle at the current position is greater than 0, and we need to update the width of the rectangle at the current position based on the width of the rectangle at the position above it
        width = Math.min(width, left[k][j]);
        // Then we can compute the area of the rectangle with the current position
        area = Math.max(area, (i - k + 1) * width);
      }
      ret = Math.max(ret, area);
    }
  }
  return ret;
};


// maximalRectangle([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]);

// 单调栈
var maximalRectangle2 = function (matrix) {
  let m = matrix.length, n = matrix[0].length, left = new Array(matrix.length).fill(0).map(() => new Array(matrix[0].length).fill(0)), ret = 0;
  if (m === 0) {
    return 0;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === '1') {
        left[i][j] = (j === 0 ? 0 : left[i][j - 1]) + 1;
      }
    }
  }

  console.log(left);


  for (let j = 0; j < n; j++) { // 对于每一列，使用基于柱状图的方法
    let up = new Array(m).fill(0), down = new Array(m).fill(0), stack = new Array();

    for (let i = 0; i < m; i++) {
      while (stack.length && left[stack[stack.length - 1]][j] >= left[i][j]) {
        stack.pop();
      }
      up[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
      stack.push(i);
    }

    console.log('up', up);

    stack = [];

    for (let i = m - 1; i >= 0; i--) {
      while (stack.length && left[stack[stack.length - 1]][j] >= left[i][j]) {
        stack.pop();
      }
      down[i] = stack.length === 0 ? m : stack[stack.length - 1];
      stack.push(i);
    }

    console.log('down', down);

    for (let i = 0; i < m; i++) {
      const height = down[i] - up[i] - 1;
      const area = height * left[i][j];
      ret = Math.max(ret, area);
    }
  }
  return ret;
};

maximalRectangle2([["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]);