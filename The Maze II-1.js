

function Point(x, y, len) {
  this.x = x;
  this.y = y;
  this.len = len;
}

function shortestDistance(maze, start, destination) {
  let m = maze.length;
  let n = maze[0].length;
  let distance = new Array(m);
  let visited = new Array(m);
  for (let i = 0; i < m; ++i) {
    distance[i] = [];
    visited[i] = [];
    for (let j = 0; j < n; ++j) {
      distance[i][j] = Number.MAX_VALUE;
    }
  }


  

  let dir = [[1, 0], [-1, 0], [0, 1], [0, -1]];

  let q = [];
  q.push(new Point(start[0], start[1], 0));

  while (q.length) {
    console.log();
    console.log("Start with new Point");
    console.log(q);
    let p = q.shift();

    if (p.len >= distance[p.x][p.y]) {
      console.log("len larger than current and p.len is: " + p.len + "and distance is: " + distance[p.x][p.y]);
      continue;
    }
    distance[p.x][p.y] = p.len;
    for (let i = 0; i < 4; i++) {
      console.log("Now start moving the point");
      let xx = p.x;
      let yy = p.y;
      let len = p.len;
      while (xx >= 0 && xx < m && yy >= 0 && yy < n && maze[xx][yy] != 1) {
        xx += dir[i][0];
        yy += dir[i][1];
        len++;
        console.log("new direct is xx: " + xx + " and yy is: " + yy + " and len is: " + len);
      }
      xx -= dir[i][0];
      yy -= dir[i][1];
      len--;
      console.log("finish moving to this direct and now moving back and xx: " + xx + " and yy is: " + yy + " and len is: " + len);
      q.push(new Point(xx, yy, len));
    }
    console.log(distance);
  }

  return distance[destination[0]][destination[1]] == Number.MAX_VALUE ? -1 : distance[destination[0]][destination[1]];
}


shortestDistance([[0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 0], [1, 1, 0, 1, 1], [0, 0, 0, 0, 0]], [0, 4], [4, 4])