/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (rotated, target) {
  var left = 0;
  var right = rotated.length - 1;
  while (left <= right) {
    var middle = Math.floor((right + left) / 2);
    if (rotated[middle] === target) {
      return middle;
    }

    if (rotated[left] <= rotated[middle]) {

      if (rotated[left] <= target && target < rotated[middle]) {

        right = middle - 1;
      } else {

        left = middle + 1;
      }
    } else {
      if (rotated[middle] < target && target <= rotated[right]) {
        left = middle + 1;
      } else {
        right = middle - 1;
      }
    }
  }

  return -1;
};
