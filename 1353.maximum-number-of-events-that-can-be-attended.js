/*
 * @lc app=leetcode id=1353 lang=javascript
 *
 * [1353] Maximum Number of Events That Can Be Attended
 */

// @lc code=start
/**
 * @param {number[][]} events
 * @return {number}
 */

// 思路: 每一天，先参加最早结束的event
var maxEvents = function (events) {
  let pq = [];
  let lastDay = 0;
  if (events.length === 1) {
    return 1;
  }

  events.sort((a, b) => {
    lastDay = Math.max(lastDay, a[1], b[1]);
    return a[0] - b[0];
  });

  let i = 0,
    res = 0,
    n = events.length;
  for (let d = 1; d <= lastDay; ++d) {
    // 排除掉已经过期的event
    while (pq.length && pq[0] < d) pq.shift();
    // 记录从这一天开始的event
    while (i < n && events[i][0] == d) {
      pq.push(events[i][1]);
      i += 1;
    }
    pq.sort((a, b) => a - b);

    // 这一天参加一个event
    if (pq.length) {
      pq.shift();
      res += 1;
    }
  }

  console.log(res);
  return res;
};

// Javascript 的方法1
let maxEvents2 = function (events) {
  let seen = new Set();
  events.sort((a, b) => (a[1] == b[1] ? a[0] - b[0] : a[1] - b[1]));
  console.log(events);
  for (let [i, j] of events) {
    while (i <= j && seen.has(i)) i += 1;
    if (i <= j) seen.add(i);
  }
  return seen.size;
};

// Javascript 的方法2
var maxEvents3 = function (events) {
  // Sort events list by start time
  events.sort((a, b) => b[0] - a[0]);
  console.log(events);

  // Add colliding values to the queue
  // The queue is sorted by end time desc
  const priorityQueue = [events.pop()];
  let day = priorityQueue[0][0];
  let count = 0;

  while (events.length > 0 || priorityQueue.length > 0) {
    while (events.length > 0 && events[events.length - 1][0] === day) {
      priorityQueue.push(events.pop());
    }
    priorityQueue.sort((a, b) => b[1] - a[1]);

    // Discard no longer eligible events + 1 (the one we're attending now)
    while (
      priorityQueue.length > 0 &&
      day > priorityQueue[priorityQueue.length - 1][1]
    ) {
      priorityQueue.pop();
    }
    if (priorityQueue.pop() != null) {
      count += 1;
    }

    // While day += 1 would work, we can do better. We can skip to the start of the next event,
    // either in the Priority Queue or events
    const nextPrioStart =
      priorityQueue.length > 0
        ? priorityQueue[priorityQueue.length - 1][0]
        : Infinity;
    const nextEventStart =
      events.length > 0 ? events[events.length - 1][0] : Infinity;
    day = Math.max(day + 1, Math.min(nextPrioStart, nextEventStart));
  }

  return count;
};

maxEvents3([
  [1, 2],
  [1, 2],
  [1, 6],
  [1, 2],
  [1, 2],
]);
// @lc code=end
