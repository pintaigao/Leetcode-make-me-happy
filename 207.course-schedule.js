/*
 * @lc app=leetcode id=207 lang=javascript
 *
 * [207] Course Schedule
 */
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

// var canFinish = function (numCourses, prerequisites) {
//   let adj = new Array(numCourses).fill(0).map(() => new Array());
//   let haveTakenClass = new Set();
//   let haveCheckPosition = new Set();

//   let dfs = function (classNum) {
//     if (haveCheckPosition.has(classNum) || adj[classNum].length === 0) {
//       return true;
//     }

//     console.log("For now class num is: " + classNum);
//     console.log("And have taken class is: ");
//     console.log(haveTakenClass);

//     if (haveTakenClass.has(classNum)) {
//       console.log("Come to the codition");
//       console.log(haveTakenClass);
//       return false;
//     }
//     haveTakenClass.add(classNum);

//     for (let num of adj[classNum]) {
//       console.log("Now num is:" + num);
//       if (!dfs(num)) {
//         console.log("Comw to the condition");
//         return false;
//       }
//       haveCheckPosition.add(i);
//     }

//     haveTakenClass.delete(classNum);

//     return true;
//   };

//   for (let pair of prerequisites) {
//     adj[pair[0]].push(pair[1]);
//   }

//   console.log(adj);

//   for (let i = 0; i < numCourses; i++) {
//     console.log("For now i is: " + i);
//     if (!dfs(i)) {
//       console.log("Run if !dfs");
//       return false;
//     }

//     console.log("Let's see the haveTaken Class");
//     console.log(haveTakenClass);

//     haveCheckPosition.add(i);
//   }

//   return true;
// };

// canFinish(8, [
//   [1, 0],
//   [2, 6],
//   [1, 7],
//   [6, 4],
//   [7, 0],
//   [0, 5],
// ]);

// 2. Topological Sort
/* L = Empty list that will contain the sorted elements
S = Set of all nodes with no incoming edge

while S is non-empty do
    remove a node n from S
    add n to tail of L
    for each node m with an edge e from n to m do
        remove edge e from the graph
        if m has no other incoming edges then
            insert m into S

if graph has edges then
    return error   (graph has at least one cycle)
else 
    return L   (a topologically sorted order) */

/**
 * In order to find a global order, we can start from those nodes which do not have any prerequisites (i.e. indegree of node is zero), we then incrementally add new nodes to the global order, following the dependencies (edges).
 * Once we follow an edge, we then remove it from the graph.
 * With the removal of edges, there would more nodes appearing without any prerequisite dependency, in addition to the initial list in the first step.
 * The algorithm would terminate when we can no longer remove edges from the graph. There are two possible outcomes:
 *  1). If there are still some edges left in the graph, then these edges must have formed certain cycles, which is similar to the deadlock situation. It is due to these cyclic dependencies that we cannot remove them during the above processes.
 *  2). Otherwise, i.e. we have removed all the edges from the graph, and we got ourselves a topological order of the graph.
 * */

var canFinish = function (numCourses, prerequisites) {
  if (prerequisites.length == 0) return true; // no cycle could be formed in empty graph.

  // course -> list of next courses
  let graph = {};

  // build the graph first
  for (let relation of prerequisites) {
    // relation[1] -> relation[0]
    let prevCourse = getCreateGNode(graph, relation[1]);
    let nextCourse = getCreateGNode(graph, relation[0]);

    // Reference Type
    prevCourse.outNodes.push(relation[0]);
    nextCourse.inDegrees += 1;
  }

  console.log(graph);

  // We start from courses that have no prerequisites.
  let totalDeps = prerequisites.length;
  let nodepCourses = [];
  for (let entry in graph) {
    let node = graph[entry];
    if (node.inDegrees == 0) nodepCourses.push(entry);
  }

  console.log(nodepCourses);

  let removedEdges = 0;
  while (nodepCourses.length > 0) {
    let course = nodepCourses.shift();

    for (let nextCourse of graph[course].outNodes) {
      let childNode = graph[nextCourse];
      childNode.inDegrees -= 1;
      removedEdges += 1;
      if (childNode.inDegrees == 0) nodepCourses.push(nextCourse);
    }
  }

  console.log(removedEdges);

  if (removedEdges != totalDeps)
    // if there are still some edges left, then there exist some cycles
    // Due to the dead-lock (dependencies), we cannot remove the cyclic edges
    return false;
  else return true;
};

/**
 * Retrieve the existing <key, value> from graph, otherwise create a new one.
 */
let getCreateGNode = function (graph, course) {
  let gNode = {
    inDegrees: 0,
    outNodes: [],
  };
  let node;
  if (graph.hasOwnProperty(course)) {
    node = graph[course];
  } else {
    node = gNode;
    graph[course] = node;
  }
  return node;
};

console.log(
  canFinish(8, [
    [1, 0],
    [2, 6],
    [1, 7],
    [0, 7],
    [6, 4],
    [7, 0],
    [0, 5],
  ])
);
