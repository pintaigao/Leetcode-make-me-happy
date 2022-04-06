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

  // Priority Queue， 按照每个会议的结束时间排序，结束时间最早的会议在前面
  events.sort((a, b) => {
    lastDay = Math.max(lastDay, a[1], b[1]);
    return a[0] - b[0];
  });

  let index = 0,
    res = 0,
    n = events.length;

  // 循环每一天
  for (let d = 1; d <= lastDay; ++d) {
    // 排除掉已经过期的event
    while (pq.length && pq[0] < d) pq.shift();
    // 记录从这一天开始的event，pq push的是这个event的结束时间
    while (index < n && events[index][0] == d) {
      pq.push(events[i][1]);
      index += 1;
    }
    // 马上要结束的排前面
    pq.sort((a, b) => a - b);

    // 这一天参加一个event
    if (pq.length) {
      pq.shift();
      res += 1;
    }
  }

  return res;
};

// Javascript 的方法1，保证每一天都参加一个event
let maxEvents2 = function (events) {
  let seen = new Set();
  // sort event，按照结束时间排序，结束时间最早的会议在前面，如果结束时间相同，按照开始时间排序
  events.sort((a, b) => (a[1] != b[1] ? a[1] - b[1] : a[0] - b[0]));
  console.log(events);
  for (let [start, end] of events) {
    // 假如说start的这一天，已经参加过前一个event了，那就加一天，看看next day能不能参加event
    while (start <= end && seen.has(start)) start += 1;
    if (start <= end) seen.add(start);
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

/* Fastest Solution */
let maxEvents4 = function (events) {
  const heap = new MinPriorityQueue({
    compare: (a, b) => {
      return events[a][1] > events[b][1];
    },
  });

  events.sort((a, b) => {
    return a[0] - b[0];
  });

  let i = 0,
    res = 0;

  for (let day = 0; day <= Math.pow(10, 5); day++) {
    while (i < events.length && events[i][0] == day) {
      const event = events[i];
      const length = event[1] - event[0];
      heap.enqueue(i);
      i++;
    }

    if (heap.size()) {
      heap.dequeue();
      res++;
      while (heap.size() && events[heap.front()][1] == day) heap.dequeue();
    }
  }
  return res;
};

maxEvents3([
  [1, 2],
  [1, 2],
  [1, 6],
  [1, 2],
  [1, 2],
]);
// @lc code=end
