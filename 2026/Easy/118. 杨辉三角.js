// 迭代方式
var generate = function (numRows) {
  // 先把第一层装进去作为 base case
  var res = [[1]];
  if (numRows < 1) {
    return res;
  }

  // 输入上一层的元素，生成并返回下一层的元素
  function generateNextRow(prevRow) {
    var curRow = [1];
    // 生成中间元素
    for (var i = 0; i < prevRow.length - 1; i++) {
      curRow.push(prevRow[i] + prevRow[i + 1]);
    }
    curRow.push(1);
    return curRow;
  }

  // 开始一层一层生成，装入 res
  for (var i = 2; i <= numRows; i++) {
    var prevRow = res[res.length - 1];
    res.push(generateNextRow(prevRow));
  }
  return res;
};


// 递归方式
// 定义：输入 numRows，返回行数为 numRows 的杨辉三角
var generate2 = function (numRows) {
  // 递归的 base case
  if (numRows === 1) {
    var triangle = [];
    // 先把第一层装进去作为 base case
    var firstRow = [1];
    triangle.push(firstRow);
    return triangle;
  }

  // 先递归生成高度为 numRows - 1 的杨辉三角
  var triangle = generate2(numRows - 1);

  // 根据最底层元素生成一行新元素
  var bottomRow = triangle[triangle.length - 1];
  var newRow = [1];
  for (var i = 0; i < bottomRow.length - 1; i++) {
    newRow.push(bottomRow[i] + bottomRow[i + 1]);
  }
  newRow.push(1);
  // 把新的一行放到杨辉三角底部
  triangle.push(newRow);

  return triangle;
};