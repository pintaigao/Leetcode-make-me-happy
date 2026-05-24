var getRow = function (rowIndex) {
  // 定义：输入行数，返回该行的杨辉三角数列
  var getRowHelper = function (rowIndex) {
    // 每一行开头是 1
    let curRow = [1];
    // base case
    if (rowIndex === 0) return curRow;

    // 递归计算出上一行
    let preRow = getRowHelper(rowIndex - 1);
    for (let i = 0; i < preRow.length - 1; i++) {
      // 这一行每个元素等于上一行的两个相邻元素之和
      curRow.push(preRow[i] + preRow[i + 1]);
    }
    // 每一行结尾是 1
    curRow.push(1);
    return curRow;
  };

  return getRowHelper(rowIndex);
}