from typing import List


class Solution:
    # 初始化 0...n-1 共 n 个节点
    def validTree(self, n: int, edges: List[List[int]]) -> bool:
        uf = self.UF(n)
        # 遍历所有边，将组成边的两个节点进行连接
        for edge in edges:
            u = edge[0]
            v = edge[1]
            # 若两个节点已经在同一连通分量中，会产生环
            if uf.connected(u, v):
                return False
            # 这条边不会产生环，可以是树的一部分
            uf.union(u, v)
        # 要保证最后只形成了一棵树，即只有一个连通分量
        return uf.get_count() == 1

    class UF:
        # 连通分量个数
        def __init__(self, n: int):
            self.count = n
            # 存储一棵树
            self.parent = [i for i in range(n)]
            # 记录树的「重量」
            self.size = [1] * n
            # n 为图中节点的个数

        # 将节点 p 和节点 q 连通
        def union(self, p: int, q: int):
            rootP = self.find(p)
            rootQ = self.find(q)
            if rootP == rootQ:
                return

            # 小树接到大树下面，较平衡
            if self.size[rootP] > self.size[rootQ]:
                self.parent[rootQ] = rootP
                self.size[rootP] += self.size[rootQ]
            else:
                self.parent[rootP] = rootQ
                self.size[rootQ] += self.size[rootP]
            # 两个连通分量合并成一个连通分量
            self.count -= 1

        # 判断节点 p 和节点 q 是否连通
        def connected(self, p: int, q: int) -> bool:
            return self.find(p) == self.find(q)

        # 返回节点 x 的连通分量根节点
        def find(self, x: int) -> int:
            while self.parent[x] != x:
                # 进行路径压缩
                self.parent[x] = self.parent[self.parent[x]]
                x = self.parent[x]
            return x

        # 返回图中的连通分量个数
        def get_count(self) -> int:
            return self.count
