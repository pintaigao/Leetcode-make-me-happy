class WeightedDigraph:
    # 存储相邻节点及边的权重
    class Edge:
        def __init__(self, to, weight):
            self.to = to
            self.weight = weight

    def __init__(self, n):
        # 邻接矩阵，matrix[from][to] 存储从节点 from 到节点 to 的边的权重
        # 0 表示没有连接
        self.matrix = [[0] * n for _ in range(n)]

    # 增，添加一条带权重的有向边，复杂度 O(1)
    def addEdge(self, from_node, to, weight):
        self.matrix[from_node][to] = weight

    # 删，删除一条有向边，复杂度 O(1)
    def removeEdge(self, from_node, to):
        self.matrix[from_node][to] = 0

    # 查，判断两个节点是否相邻，复杂度 O(1)
    def hasEdge(self, from_node, to):
        return self.matrix[from_node][to] != 0

    # 查，返回一条边的权重，复杂度 O(1)
    def weight(self, from_node, to):
        return self.matrix[from_node][to]

    # 查，返回某个节点的所有邻居节点，复杂度 O(V)
    def neighbors(self, v):
        res = []
        for i in range(len(self.matrix[v])):
            if self.matrix[v][i] != 0:
                res.append(self.Edge(i, self.matrix[v][i]))
        return res

if __name__ == "__main__":
    graph = WeightedDigraph(3)
    graph.addEdge(0, 1, 1)
    graph.addEdge(1, 2, 2)
    graph.addEdge(2, 0, 3)
    graph.addEdge(2, 1, 4)

    print(graph.hasEdge(0, 1)) # True
    print(graph.hasEdge(1, 0)) # False

    for edge in graph.neighbors(2):
        print(f"{2} -> {edge.to}, weight: {edge.weight}")
    # 2 -> 0, weight: 3
    # 2 -> 1, weight: 4

    graph.removeEdge(0, 1)
    print(graph.hasEdge(0, 1)) # False