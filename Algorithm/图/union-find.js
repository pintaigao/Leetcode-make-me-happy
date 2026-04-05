class UF {
  constructor(n) {
    // 记录连通分量，一开始互不连通，有n个连通分量,即每个节点自成一个分量，自己可以连通自己
    this._count = n;
    // 节点 x 的父节点是 parent[x]
    this.parent = new Array(n);
    this.size = new Array(n);
    // 一开始互不连通
    // 父节点指针初始指向自己
    for (var i = 0; i < n; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
  }

  union(p, q) {
    var rootP = this.find(p);
    var rootQ = this.find(q);
    if (rootP === rootQ)
      return;
    // 将两棵树合并为一棵
    // this.parent[rootP] = rootQ;
    // parent[rootQ] = rootP 也一样
    //parent[rootQ] = rootP 表示q的根节点是 rootP
    // 小树接到大树下面，较平衡
    if (this.size[rootP] < this.size[rootQ]) {
      this.parent[rootP] = rootQ;
      this.size[rootQ] += this.size[rootP];
    } else {
      this.parent[rootQ] = rootP;
      this.size[rootP] += this.size[rootQ];
    }
    // 两个分量合二为一
    this._count--;
  }

  // 判断 p 和 q 是否连通
  connected(p, q) {
    return this.find(p) == this.find(q);
  }

  // 返回某个节点 x 的根节点
  find(x) {
    // while x 不是根节点（更新后的 x 不是指向自己），就继续找
    while (this.parent[x] !== x) {
      // 下一段：路径压缩 保持树的扁平化，减少树的高度，优化性能 （可选）
      // this.parent[x] = this.parent[this.parent[x]];
      x = this.parent[x];
    }
    return x;

    // 递归写法
    // if (this.parent[x] != x) {
    //     this.parent[x] = this.find(this.parent[x]);
    // }
    // return this.parent[x];

    // 递归写法更好理解版
    // if (this.parent[x] === x) {
    //   return x;
    // }
    // var root = this.find(this.parent[x]);
    // this.parent[x] = root;
    // return root;
  }

  // 返回当前的连通分量个数
  count_() {
    return this._count;
  }

  // 返回节点 x 所在集合的大小
  size_(x) {
    var rootX = this.find(x);
    return this.size[rootX];
  }
}

export { UF };

// 执行例子
let uf = new UF(10);
console.log(uf.count_()); // 10
uf.union(0, 1);
console.log(uf.count_()); // 9
uf.union(1, 5);
uf.union(1, 9);
uf.union(2, 8);
uf.union(8, 6);
uf.union(7, 2);
console.log(uf.count_()); // 8
console.log(uf.parent);


