/**
 * @param {number[][]} points
 * @return {number}
 */

var numberOfBoomerangs = function (points) {
  let count = 0;
  for (let i = 0; i < points.length; i++) {
    console.log("New one");
    const memory = {};
    for (let j = 0; j < points.length; j++) {
      if (i === j) continue;
      const dist = Math.pow(points[i][0] - points[j][0], 2) + Math.pow(points[i][1] - points[j][1], 2);
      if (memory[dist]) count += memory[dist] * 2;
      memory[dist] ? memory[dist] ++ : memory[dist] = 1;
    }
    console.log(memory);
  }

  return count;
};

numberOfBoomerangs([[0,0],[1,0],[2,0]]);
