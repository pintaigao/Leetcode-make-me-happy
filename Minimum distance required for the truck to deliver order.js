



class Point {
    constructor(x, y, len) {
        this.x = x;
        this.y = y;
        this.len = len;
    }
}

function minimunDistance(numRows, numColumns, area) {
    console.log(area[0][0]);

    if (area.length === 0) {
        return -1;
    }
    let dir = [[-1, 0], [1, 0], [0, 1], [0, -1]];

    let visited = new Array(numRows);
    for (let i = 0; i < numRows; i++) {
        visited[i] = [];
        for (let j = 0; j < numColumns; j++) {
            visited[i][j] = false;
        }
    }

    let queue = [];
    queue.push(new Point(0, 0, 0));
    visited[0][0] = true;
    while (queue.length) {
        let curr = queue.shift();
        for (let i = 0; i < dir.length; i++) {
            let x = curr.x + dir[i][0];
            let y = curr.y + dir[i][1];
            console.log("Current travel point is: "+x+","+y);
            
            if (x >= 0 && x < numRows && y >= 0 && y < numColumns && area[x][y] === 9) {
                console.log(curr.len+1);
                return curr.len+1;
            }
            
            if (x >= 0 && x < numRows && y >= 0 && y < numColumns && area[x][y] != 0 && !visited[x][y]) {
                queue.push(new Point(x, y, curr.len + 1));
                visited[x][y] = true;
            }
        }
        console.log("After moving four direction and now in queue:");
        console.log(queue);
        console.log(visited);
        
    }
    return -1;
}

minimunDistance(3, 3, [[1, 1, 1], [1, 1, 1], [1, 9, 1]]);