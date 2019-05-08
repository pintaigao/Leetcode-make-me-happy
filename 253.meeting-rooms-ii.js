/**
 * @param {number[][]} intervals
 * @return {number}
 */
var minMeetingRooms = function(intervals) {
	var starts = intervals.concat().sort(function(a, b) {
		return a[0] - b[0];
  });

	var ends = intervals.sort(function(a, b) {
		return a[1] - b[1];
  });

	var rooms = 0;
	var end = 0;
	for (var i = 0; i < intervals.length; i++) {
		if (starts[i][0] < ends[end][1]) {
			rooms++;
		} else {
			end++;
		}
  }
	return rooms;
};
