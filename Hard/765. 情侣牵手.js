var minSwapsCouples = function (row) {
  var n = row.length, uf = new UF(n);
  // 0 / 2 == 1 / 2 == 0
  // 2 / 2 == 3 / 2 == 1
  // ....
  for (var i = 0; i < n; i += 2) {
    // 将两人的 couple_id 进行连接
    uf.union(Math.floor(row[i] / 2), Math.floor(row[i + 1] / 2));
  }
  // 和连通分量的差即为需要交换的次数
  return n - uf.getCount(); // Use uf.getCount() to access the count method
};

// 并查集算法模板
class UF {
  // 记录连通分量个数
  // 存储若干棵树
  constructor(n) {
    this.count = n;
    this.parent = new Array(n);
    for (var i = 0; i < n; i++) {
      this.parent[i] = i;
    }
  }

  // 将 p 和 q 连通
  union(p, q) {
    var rootP = this.find(p);
    var rootQ = this.find(q);
    if (rootP === rootQ) return;

    this.parent[rootQ] = rootP;
    this.count--;
  }

  // 判断 p 和 q 是否互相连通
  connected(p, q) {
    var rootP = this.find(p);
    var rootQ = this.find(q);
    // 处于同一棵树上的节点，相互连通
    return rootP === rootQ;
  }

  // 返回节点 x 的根节点
  find(x) {
    while (this.parent[x] !== x) {
      // 进行路径压缩
      this.parent[x] = this.parent[this.parent[x]];
      x = this.parent[x];
    }
    return x;
  }

  // 返回当前的连通分量个数
  getCount() {
    return this.count;
  }
}

// BFS的方法
var minSwapsCouples2 = function (row) {
  // tot = total couple
  // 假如第一对男生和第二对的女生坐在一起，第二对的男生和第三对的女生坐在一起
  // 第三对的男生和第一对的女生坐在一起...
  // 即 1 -> 2 -> 3 -> 1 这样就会构成一个环。其他情况也是一样，所有的情况肯定会构成若干个环
  // 对于每个环，需要操作的次数为结点的个数 - 1
  // 所以这道题转换为求图中有多少个环，且环中结点有多少个，可以使用 DFS / BFS / 并查集实现

  // BFS 求解图中的连通分量：
  // 将每个节点都标记为「未访问」，并遍历图中的每个节点
  // 如果发现一个「未访问」的节点，就从该节点出发，沿着图中的边，将其余的「未访问」的节点都标记为「已访问」
  // 并同时统计标记的次数。当遍历过程终止时，标记的数量次数即为连通分量的大小
  let n = row.length, tot = n / 2, graph = new Array(tot).fill(0).map(() => new Set())
  for (let i = 0; i < n; i += 2) {
    const l = Math.floor(row[i] / 2), r = Math.floor(row[i + 1] / 2)
    if (l !== r) {
      graph[l].add(r)
      graph[r].add(l)
    }
  }

  let visited = new Array(tot).fill(false), ret = 0
  for (let i = 0; i < tot; i++) {
    // 一旦做错，必成环
    if (graph[i].size && !visited[i]) {
      let queue = [i], cnt = 0
      visited[i] = true

      while (queue.length) {
        const x = queue.shift()
        cnt += 1

        // Set 也可以时 iterable
        for (const y of graph[x]) {
          if (!visited[y]) {
            visited[y] = true
            queue.push(y)
          }
        }

        console.log(queue);

      }

      // 在这种环里面的交换次数就是节点数量 - 1，所以目的就是找到有几个这样的环
      ret += cnt - 1
    }

    console.log(ret);

  }
  return ret
};

minSwapsCouples2([0, 2, 3, 1])