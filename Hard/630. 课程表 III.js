/**
 * @param {number[][]} courses
 * @return {number}
 */
var scheduleCourse = function (courses) {
  // 1. deadline 越早限制越强，所以先按照 lastDay 排序
  courses.sort((a, b) => a[1] - b[1]);

  let total = 0;
  const maxHeap = new PriorityQueue((a, b) => b - a);

  for (const [duration, lastDay] of courses) {
    // 2. 当前课程可以直接放进去
    if (total + duration <= lastDay) {
      total += duration;
      maxHeap.enqueue(duration);
    }

    // 3. 当前课程放不进去，但是它比已选最长课程更短
    // 那就用当前短课替换之前最长的课
    else if (maxHeap.size() > 0 && maxHeap.front() > duration) {
      total -= maxHeap.dequeue();
      total += duration;
      maxHeap.enqueue(duration);
    }
  }

  return maxHeap.size();
};