// 线性探查法的基本逻辑，伪码实现
class MyLinearProbingHashMap {
  constructor() {
    // 数组中每个元素都存储一个键值对
    this.table = new Array(10).fill(null);
  }

  hash(key) {
    return key % this.table.length;
  }

  put(key, value) {
    var index = this.hash(key);
    var node = this.table[index];
    if (node === null) {
      this.table[index] = { key: key, value: value };
    } else {
      // 线性探查法的逻辑
      // 向后探查，直到找到 key 或者找到空位
      while (index < this.table.length && this.table[index] !== null && this.table[index].key !== key) {
        index++;
      }
      this.table[index] = { key: key, value: value };
    }
  }

  get(key) {
    var index = this.hash(key);
    // 向后探查，直到找到 key 或者找到空位
    while (index < this.table.length && this.table[index] !== null && this.table[index].key !== key) {
      index++;
    }
    if (this.table[index] === null) {
      return -1;
    }
    return this.table[index].value;
  }

  remove(key) {
    var index = this.hash(key);
    // 向后探查，直到找到 key 或者找到空位
    while (index < this.table.length && this.table[index] !== null && this.table[index].key !== key) {
      index++;
    }
    // 删除 this.table[index]
    // ...
  }
}

// 搬移数据的线性探查法
class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }
}

// 用线性探查法解决哈希冲突的简化实现（rehash 版）
class ExampleLinearProbingHashMap1 {
  constructor(cap) {
    // 哈希表的底层数组，每个索引存储一个键值对
    this.table = new Array(cap);
  }

  // 增/改
  put(key, value) {
    const index = this.findKeyIndex(key);
    this.table[index] = new Node(key, value);
  }

  // 查，找不到就返回 -1
  get(key) {
    const index = this.findKeyIndex(key);
    return this.table[index] ? this.table[index].val : -1;
  }

  // 删
  remove(key) {
    const index = this.findKeyIndex(key);
    if (!this.table[index]) {
      return;
    }
    this.table[index] = null;
    // 保持元素连续性，搬移数据（这个过程称为 rehash）
    let nextIndex = (index + 1) % this.table.length;
    while (this.table[nextIndex]) {
      const entry = this.table[nextIndex];
      this.table[nextIndex] = null;
      // 这个操作是关键，利用 put 方法，将键值对重新插入
      // 这样就能把它们移动到正确的 table 索引位置
      this.put(entry.key, entry.val);
      nextIndex = (nextIndex + 1) % this.table.length;
    }
  }

  // 线性探测法查找 key 在 table 中的索引
  // 如果找不到，返回的就是下一个为 null 的索引，可用于插入
  findKeyIndex(key) {
    let index = this.hash(key);
    while (this.table[index]) {
      if (this.table[index].key === key) {
        return index;
      }
      // 注意环形数组特性
      index = (index + 1) % this.table.length;
    }
    return index;
  }

  hash(key) {
    return key % this.table.length;
  }
}

// Testing the class
const map1 = new ExampleLinearProbingHashMap1(10);
map1.put(1, 1);
map1.put(2, 2);
map1.put(10, 10);
map1.put(20, 20);
map1.put(30, 30);
map1.put(3, 3);
console.log(map1.get(1)); // 1
console.log(map1.get(2)); // 2
console.log(map1.get(20)); // 20

map1.put(1, 100);
console.log(map1.get(1)); // 100

map1.remove(20);
console.log(map1.get(20)); // -1
console.log(map1.get(30)); // 30

//特殊占位符的线性探查法 
// 用线性探查法解决哈希冲突的简化实现（特殊占位符版）
class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }
}

class ExampleLinearProbingHashMap2 {
  constructor(initCapacity) {
    // 用于标记被删元素的占位符
    this.DELETED = new Node(-2, -2);
    // 真正存储键值对的数组
    this.table = new Array(initCapacity).fill(null);
  }

  // 增/改
  put(key, val) {
    let index = this.findKeyIndex(key);
    if (index !== -1) {
      const node = this.table[index];
      if (node !== null) {
        node.val = val;
        return;
      }
    }

    // key 不存在
    const node = new Node(key, val);
    // 在 table 中找一个空位或者占位符进行插入
    index = this.hash(key);
    while (this.table[index] !== null && this.table[index] !== this.DELETED) {
      index = (index + 1) % this.table.length;
    }
    this.table[index] = node;
  }

  // 删
  remove(key) {
    const index = this.findKeyIndex(key);
    if (index === -1) {
      // key 不存在，不需要 remove
      return;
    }
    // 直接用占位符表示删除
    this.table[index] = this.DELETED;
  }

  // 查，返回 key 对应的 val，如果 key 不存在，则返回 -1
  get(key) {
    const index = this.findKeyIndex(key);
    if (index === -1) {
      return -1;
    }

    return this.table[index].val;
  }

  // 线性探测法查找 key 在 table 中的索引
  // 如果找不到，返回 -1
  findKeyIndex(key) {
    // 因为删除元素时只是标记为 DELETED，并不是真的删除，所以 table 可能会被填满，导致死循环
    // step 用来记录查找的步数，防止死循环
    let step = 0;
    // 注意环形数组特性
    for (let i = this.hash(key); this.table[i] !== null; i = (i + 1) % this.table.length) {
      // 防止死循环
      if (++step > this.table.length) {
        return -1;
      }
      // 遇到占位符直接跳过
      if (this.table[i] === this.DELETED) {
        continue;
      }
      if (this.table[i].key === key) {
        return i;
      }
    }

    return -1;
  }

  // 哈希函数，将键映射到 table 的索引
  hash(key) {
    return key % this.table.length;
  }
}

// Testing the class
var map = new ExampleLinearProbingHashMap2(10);
map.put(1, 1);
map.put(2, 2);
map.put(10, 10);
map.put(20, 20);
map.put(30, 30);
map.put(3, 3);
console.log(map.get(1)); // 1
console.log(map.get(2)); // 2
console.log(map.get(20)); // 20

map.put(1, 100);
console.log(map.get(1)); // 100

map.remove(20);
console.log(map.get(20)); // -1
console.log(map.get(30)); // 30