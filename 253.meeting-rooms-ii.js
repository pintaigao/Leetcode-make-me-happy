/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function (intervals) {
  //Base cases
  if (intervals.length === 0) return 0;
  if (intervals.length === 1) return 1;

  let minRoomsRequired = 0;

  let startTime = [];
  let endTime = [];
  for (i = 0; i < intervals.length; i++) {
    startTime.push(intervals[i][0]);
    endTime.push(intervals[i][1]);
  }

  //sort interval by the starting time.
  startTime.sort((a, b) => a - b);

  //sort interval by the end time.
  endTime.sort((a, b) => a - b);

  let endPointer = 0;
  let startPointer = 0;
  let usedRooms = 0;

  while (startPointer < startTime.length) {
    usedRooms++;
    startPointer++;

    if (startTime[startPointer] >= endTime[endPointer]) {
      usedRooms--;
      endPointer++;
    }
  }

  return usedRooms;
};

minMeetingRooms([
  [0, 30],
  [5, 10],
  [15, 20],
]);
