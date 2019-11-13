/*
 * @lc app=leetcode id=439 lang=javascript
 *
 * [439] Ternary Expression Parser
 */
/**
 * @param {string} expression
 * @return {string}
 */
function parseTernary(expression) {
  const N = expression.length;
  const stack = [expression[N - 1]];

  for (let i = N - 2; i >= 0; i -= 2) {

    if (expression[i] === ':') {
      console.log("Ok come to stack");
      stack.push(expression[i - 1]);
    } else {
      const l = stack.pop();
      const r = stack.pop();
      if (expression[i - 1] === 'T') {
        stack.push(l);
      } else {
        stack.push(r);
      }
    }
    console.log(stack);
    console.log();
  }
  return stack[0];
}

parseTernary("T?T?F:5:3");

