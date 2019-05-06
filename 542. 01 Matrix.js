const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function updateMatrix(matrix) {
  const m = matrix.length;
  const n = matrix[0].length;
  let queue = [];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        queue.push([i, j]);
      } else matrix[i][j] = Number.MAX_VALUE;
    }
  }

 
  while (queue.length) {

    console.log(queue);
    const [i, j] = queue.shift();

    for (let d of dirs) {
      const row = i + d[0];
      const col = j + d[1];

      if (row < 0 || row >= m || col < 0 || col >= n || matrix[row][col] <= matrix[i][j] + 1) {
        // console.log(`Come to here and row, col is: ${row}, ${col}, and matrix[i][j] is ${matrix[i][j]}`);
        continue;
      }


      // console.log(`If wont, the one is [${[i,j]}] and [${[row,col]}]`);
      // console.log(matrix[row][col]);
      // console.log(matrix[i][j] + 1);


      queue.push([row, col]);
      matrix[row][col] = matrix[i][j] + 1;
    }
  }

  return matrix;
}

let matrix = [[0,0,0],[0,1,0],[1,1,1]];
updateMatrix(matrix);