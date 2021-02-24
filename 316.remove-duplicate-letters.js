/*
 * @lc app=leetcode id=316 lang=javascript
 *
 * [316] Remove Duplicate Letters
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
// Approach 2: Greedy - Solving with Stack
let removeDuplicateLetters2 = function (s) {
  let stack = [];
  // this lets us keep track of what's in our solution in O(1) time
  let seen = new Set();
  // this will let us know if there are any more instances of s[i] left in s
  let last_occurrence = {};
  for (let i = 0; i < s.length; i++) {
    last_occurrence[s[i]] = i;
  }
  console.log(last_occurrence);

  // Loop every char in string
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    console.log("Let's see the char: " + c);
    // we can only try to add c if it's not already in our solution
    // this is to maintain only one of each character
    if (!seen.has(c)) {
      console.log("Seen doesn't has " + c);
      // if the last letter in our solution:
      //     1. exists
      //     2. is greater than c so removing it will make the string smaller
      //     3. it's not the last occurrence
      // we remove it from the solution to keep the solution optimal
      while (
        stack.length !== 0 &&
        c < stack[0] &&
        last_occurrence[stack[0]] > i
      ) {
        console.log(
          "Come in the while loop and c is " +
            c +
            " and stack is: " +
            stack +
            " and last_occurrence[stack[0]] is " +
            last_occurrence[stack[0]]
        );
        seen.delete(stack.shift());
      }
      seen.add(c);
      stack.unshift(c);
      console.log(seen);
      console.log(stack);
      console.log();
    }
  }

  let result = "";
  for (let c of stack) result = c + result;
  return result;
};

console.log(removeDuplicateLetters2("dzfdagkoeefgfewdcsvrq"));
// @lc code=end
