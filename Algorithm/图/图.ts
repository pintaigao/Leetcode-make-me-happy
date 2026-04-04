// 图节点的逻辑结构
var Vertex = function (id: any, neighbors: Edge[]) {
  this.id = id;
  this.neighbors = neighbors;
};

// 邻接表
// graph[x] 存储 x 的所有邻居节点以及对应的权重
// 具体实现不一定非得这样，可以参考后面的通用实现
function Edge(to: any, weight: any) {
  this.to = to;
  this.weight = weight;
}
var graph: Edge[][] = [];

// 邻接矩阵
// matrix[x][y] 记录 x 指向 y 的边的权重，0 表示不相邻
var matrix: number[][] = [];