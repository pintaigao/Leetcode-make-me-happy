var MaxStack = function () {
  this.stack = [];
  this.maxStack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MaxStack.prototype.push = function (x) {
  let max = this.maxStack.length ? this.maxStack[0] : x;
  this.maxStack.unshift(Math.max(max, x));
  this.stack.unshift(x);
};

/**
 * @return {number}
 */
MaxStack.prototype.pop = function () {
  this.maxStack.shift();
  return this.stack.shift();
};

/**
 * @return {number}
 */
MaxStack.prototype.top = function () {
  return this.stack[0];
};

/**
 * @return {number}
 */
MaxStack.prototype.peekMax = function () {
  return this.maxStack[0];
};

/**
 * @return {number}
 */
MaxStack.prototype.popMax = function () {
  let max = this.peekMax();
  // remove the max from the stack
  let index = this.stack.findIndex((item) => item === max);
  this.stack.splice(index, 1);
  return max;
};

/**
 * Your MaxStack object will be instantiated and called as such:
 * var obj = new MaxStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.peekMax()
 * var param_5 = obj.popMax()
 */
