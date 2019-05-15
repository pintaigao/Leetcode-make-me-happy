/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function (nums1, nums2) {
  const map = {};
  const stack = [];
  for (i = 0; i < nums2.length; i++) {
    while (stack.length && stack[stack.length - 1] < nums2[i]) {
      map[stack.pop()] = nums2[i];
    }
    stack.push(nums2[i])

    console.log("Map is:");
    console.log(map);
    console.log("And Stack is:");
    console.log(stack);
    console.log();
  }

  while (stack.length) map[stack.pop()] = -1

  return nums1.map(n => map[n])
};

nextGreaterElement([4,1,2],[1,3,4,2]);



