class MyPriorityQueue {
  constructor(compare = (a, b) => a - b, capacity = Number.MAX_SAFE_INTEGER) {
    this._compare = compare; // compare 默认小顶堆
    this._capacity = capacity;
    this._data = [];
  }

  push(e) {
    if (this._data.length === this._capacity) return false;
    this._data.push(e);
    this.swim(this.size() - 1);
    return true;
  }

  pop() {
    if (this.isEmpty()) return null;

    const topEl = this._data[0];
    const last = this._data.pop();

    if (this.size() > 0) {
      this._data[0] = last;
      this.sink(0);
    }
    return topEl;
  }

  top() {
    if (this.isEmpty()) return null;
    return this._data[0];
  }

  sink(index = 0) {
    const n = this.size();
    const temp = this._data[index];
    let parentIndex = index;
    let childIndex = 2 * index + 1;
    while (childIndex < n) {
      if (childIndex + 1 < n && this._compare(this._data[childIndex + 1], this._data[childIndex]) < 0) {
        childIndex++;
      }
      if (this._compare(temp, this._data[childIndex]) <= 0) {
        break;
      }

      this._data[parentIndex] = this._data[childIndex];
      parentIndex = childIndex;
      childIndex = 2 * childIndex + 1;
    }
    this._data[parentIndex] = temp;
  }

  swim(index) {
    const temp = this._data[index];
    let childIndex = index;
    let parentIndex = Math.floor((childIndex - 1) / 2);

    while (childIndex > 0 && this._compare(temp, this._data[parentIndex]) < 0) {
      this._data[childIndex] = this._data[parentIndex];
      childIndex = parentIndex;
      parentIndex = Math.floor((parentIndex - 1) / 2);
    }
    this._data[childIndex] = temp;
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this._data.length;
  }

};