/*
 * @lc app=leetcode id=332 lang=javascript
 *
 * [332] Reconstruct Itinerary
 */

// @lc code=start
/**
 * @param {string[][]} tickets
 * @return {string[]}
 */

let flightMap = {};
let result = [];
var findItinerary = function (tickets) {
  // Step 1). build the graph first
  for (let ticket of tickets) {
    let origin = ticket[0];
    let dest = ticket[1];
    if (flightMap.hasOwnProperty(origin)) {
      let destList = flightMap[origin];
      destList.push(dest);
    } else {
      let destList = [];
      destList.push(dest);
      flightMap[origin] = destList;
    }
  }

  console.log(flightMap);

  // Step 2). order the destinations
  for (let key in flightMap) {
    flightMap[key].sort();
  }

  result = [];

  // Step 3). post-order DFS
  DFS("JFK");
  return result;
};

let DFS = function (origin) {
  // Visit all the outgoing edges first.
  if (flightMap.hasOwnProperty(origin)) {
    let destList = flightMap[origin];
    while (destList.length !== 0) {
      // while we visit the edge, we trim it off from graph.
      let dest = destList.shift();
      DFS(dest);
    }
  }
  // add the airport to the head of the itinerary
  result.unshift(origin);
};

// findItinerary([
//   ["JFK", "SFO"],
//   ["JFK", "ATL"],
//   ["SFO", "ATL"],
//   ["ATL", "JFK"],
//   ["ATL", "SFO"],
// ]);
// @lc code=end
