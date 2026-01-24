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
        var rootP = find(p);
        var rootQ = find(q);
        return rootP == rootQ;
    }

    // 返回某个节点 x 的根节点
    find(x) {
        while (this.parent[x] !== x) {
            // 路径压缩
            this.parent[x] = this.parent[this.parent[x]];
            x = this.parent[x];
        }
        return x;

        // 递归写法
        // if (this.parent[x] != x) {
        //     this.parent[x] = this.find(this.parent[x]);
        // }
        // return this.parent[x];

        // 递归写法更好理解版
        if (this.parent[x] === x) {
            return x;
        }
        var root = this.find(this.parent[x]);
        this.parent[x] = root;
        return root;
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