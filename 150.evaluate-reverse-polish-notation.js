/*
 * @lc app=leetcode id=150 lang=javascript
 *
 * [150] Evaluate Reverse Polish Notation
 */
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
	// Initialize array as a stack
    const nums = []
	// Loop through each token or element
    for (let token of tokens) {
		// If element is not an operator push it to the array
        if (!operations[token]) nums.push(token)
		// Otherwise if the current element is an operator get the last two numbers in the stack LIFO approach
        else {  
            let a = Number(nums.pop())
            let b = Number(nums.pop())
			// Perform the operation using the evaluate function
            nums.push(String(evaluate([b,a], token)))
        }
    }
    return Number(nums.pop())
};

// Operations. NOTE: Bitwise is used in the division to ignore the remainder
const operations = {
  "+" : (operand1, operand2) => operand1 + operand2,
  "-" : (operand1, operand2) => operand1 - operand2,
  "*" : (operand1, operand2) => operand1 * operand2,
  "/" : (operand1, operand2) => ~~(operand1 / operand2),
};

// Function to handle the operation
const evaluate = (list, operator) => list.reduce(operations[operator])
