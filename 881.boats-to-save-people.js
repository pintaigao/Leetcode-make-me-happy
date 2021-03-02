/*
 * @lc app=leetcode id=881 lang=javascript
 *
 * [881] Boats to Save People
 */

// @lc code=start
/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */

// Approach 1: Greedy (Two Pointer)

// If the heaviest person can share a boat with the lightest person, then do so. Otherwise, the heaviest person can't pair with anyone, so they get their own boat.
var numRescueBoats = function (people, limit) {
  people.sort((a, b) => a - b);
  let i = 0,
    j = people.length - 1;
  let ans = 0;

  while (i <= j) {
    // 增加一艘船,然后 shrink people
    ans += 1;

    if (people[i] + people[j] <= limit) {
      i += 1;
    }
    j -= 1;
  }

  return ans;
};

// Approach 2: Bucket Sort O(limit)
let numRescueBoats = function (people, limit) {
  let buckets = new Array(limit + 1).fill(0);
  for (let p of people) buckets[p] += 1;
  let start = 0;
  let end = buckets.length - 1;
  let solution = 0;
  while (start <= end) {
    //make sure the start always point to a valid number
    while (start <= end && buckets[start] <= 0) start += 1;
    //make sure end always point to valid number
    while (start <= end && buckets[end] <= 0) end -= 1;
    //no one else left on the ship, hence break.
    if (buckets[start] <= 0 && buckets[end] <= 0) break;
    solution += 1;
    if (start + end <= limit) buckets[start] -= 1; // both start and end can carry on the boat
    buckets[end] -= 1;
  }
  return solution;
};
// @lc code=end
