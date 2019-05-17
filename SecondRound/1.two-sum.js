/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let map = {};
  for (let i = 0; i < nums.length; i++) {
    let another = target - nums[i];
    if (map[another] !== undefined) {
      return[map[another], i];
    }

    map[nums[i]] = i;
  }

  return null;
};
