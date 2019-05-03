function minDistance(height, width, tree, squirrel, nuts) {
  let result = 0;
  let min = Number.MAX_VALUE;
  let diff = 0;
  for (let index in nuts) {
    let treeDist = computeDist(tree,nuts[index]);
    let squirrelDist = computeDist(squirrel,nuts[index]);
    result += treeDist;
    diff = squirrelDist - treeDist;
    if(diff < min){
      min = diff
    }
  }
  console.log(result*2 + min);
  return result*2 + min;
}

function computeDist(a,b){
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}


minDistance(5, 7, [2, 2], [4, 4], [[3, 0], [2, 5]]);