var MyStack = function () {
  this.q = [];
  this.top_elem = 0;
};

// 将元素 x 压入栈顶
MyStack.prototype.push = function (x) {
  // x 是队列的队尾，是栈的栈顶
  this.q.push(x);
  this.top_elem = x;
};

// 返回栈顶元素
MyStack.prototype.top = function () {
  return this.top_elem;
};

// 删除栈顶的元素并返回
MyStack.prototype.pop = function () {
  let size = this.q.length;
  // 留下队尾 2 个元素
  while (size > 2) {
    this.q.push(this.q.shift());
    size--;
  }
  // 记录新的队尾元素
  this.top_elem = this.q[0];
  this.q.push(this.q.shift());
  // 删除之前的队尾元素
  return this.q.shift();
};

// 判断栈是否为空
MyStack.prototype.empty = function () {
  return this.q.length === 0;
};