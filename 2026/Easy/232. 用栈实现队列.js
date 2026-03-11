var MyQueue = function () {
  // s1 和 s2 只能用 push 和 pop 操作来模拟队列的入队和出队
  this.s1 = [], this.s2 = [];
};

// 添加元素到队尾
MyQueue.prototype.push = function (x) {
  this.s1.push(x);
};

// 删除队头元素并返回
MyQueue.prototype.pop = function () {
  // 先调用 peek 保证 s2 非空
  this.peek();
  return this.s2.pop();
};

// 返回队头元素
MyQueue.prototype.peek = function () {
  if (this.s2.length === 0) {
    // 把 s1 元素压入 s2 中，顺序就反过来了
    while (this.s1.length > 0) {
      this.s2.push(this.s1.pop());
    }
  }

  return this.s2[this.s2.length - 1];
};

// 判断队列是否为空
MyQueue.prototype.empty = function () {
  return this.s1.length === 0 && this.s2.length === 0;
};