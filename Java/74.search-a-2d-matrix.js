/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
	if (matrix.length === 0 || matrix[0].length === 0) {
		return false;
	}
	let start = 0;
	let end = matrix.length * matrix[0].length - 1;

	while (end >= start) {
		let mid = Math.floor((start + end) / 2);
		let m = Math.floor(mid / matrix[0].length);
		let n = mid % matrix[0].length;

		if (matrix[m][n] === target) {
			return true;
		}
		if (matrix[m][n] > target) {
			//go left
			end = mid - 1;
		} else {
			//go right
			start = mid + 1;
		}

	}

	return false;
};
