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

/* 1. Greedy: Stack的方法 */
var removeDuplicateLetters = function (s) {
  let stack = [];

  // this lets us keep track of what's in our solution in O(1) time
  // this will let us know if there are any more instances of s[i] left in s
  let [seen, last_occurrence] = [new Set(), {}];

  // map记录最后出现的index
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
      /* 从s头往后loop首先保证了题目要求的相对字典序最小，
      [d]，然后z进来，比d大，所以【d，z】，f进来，比z小，但是last seen比z大，所以【d，z，f】
      a进来，比f小，而且last seen比f也小，就是在s中a出现的比f要前，所以去除f，【d，z，a】
      然后a还要和z相比较 */
      while (stack.length !== 0 && c < stack[0] && last_occurrence[stack[0]] > last_occurrence[c]) {
        console.log("Come in the while loop and c is " + c + " and stack is: " + stack + " and last_occurrence[stack[0]] is " + last_occurrence[stack[0]]);
        seen.delete(stack.shift());
      }
      seen.add(c);
      stack.unshift(c);
      console.log(seen);
      console.log(stack);
      console.log();
    }
  }

  return stack.reverse().join("");
};

console.log(removeDuplicateLetters("dzfdagkoeefgfewdcsvrq"));
// @lc code=end

// 利用 stack 结构和一个 inStack 布尔数组
var removeDuplicateLetters = function (s) {
  let stk = [];

  // 维护一个计数器记录字符串中字符的数量
  // 因为输入为 ASCII 字符，大小 256 够用了
  let count = new Array(256).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i)]++;
  }

  let inStack = new Array(256).fill(false);
  for (let c of s) {
    // 每遍历过一个字符，都将对应的计数减一
    count[c.charCodeAt(0)]--;

    if (inStack[c.charCodeAt(0)]) continue;

    while (stk.length > 0 && stk[stk.length - 1] > c) {
      // 若之后不存在栈顶元素了，则停止 pop
      if (count[stk[stk.length - 1].charCodeAt(0)] === 0) {
        break;
      }
      // 若之后还有，则可以 pop
      inStack[stk.pop().charCodeAt(0)] = false;
    }
    stk.push(c);
    inStack[c.charCodeAt(0)] = true;
  }

  let sb = '';
  while (stk.length > 0) {
    sb = stk.pop() + sb;
  }
  return sb;
};