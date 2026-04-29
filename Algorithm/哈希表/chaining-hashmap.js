// 哈希表伪码逻辑
class MyHashMap {
  constructor() {
    this.table = new Array(1000).fill(null);
  }

  // 增/改，复杂度 O(1)
  put(key, value) {
    const index = this.hash(key);
    this.table[index] = value;
  }

  // 查，复杂度 O(1)
  get(key) {
    const index = this.hash(key);
    return this.table[index];
  }

  // 删，复杂度 O(1)
  remove(key) {
    const index = this.hash(key);
    this.table[index] = null;
  }

  // 哈希函数，把 key 转化成 table 中的合法索引
  // 时间复杂度必须是 O(1)，才能保证上述方法的复杂度都是 O(1)
  hash(key) {
    // ...
  }
}

// 用拉链法解决哈希冲突的简化实现
var ExampleChainingHashMap = function (capacity) {
  // 链表节点，存储 key-value 对儿
  // 注意这里必须存储同时存储 key 和 value
  // 因为要通过 key 找到对应的 value
  var KVNode = function (key, value) {
    this.key = key;
    this.value = value;
  };

  // 底层 table 数组中的每个元素是一个链表
  this.table = new Array(capacity);

  this.hash = function (key) {
    return key % this.table.length;
  };

  // 查
  this.get = function (key) {
    var index = this.hash(key);

    if (this.table[index] == null) {
      // 链表为空，说明 key 不存在
      return -1;
    }

    var list = this.table[index];
    // 遍历链表，尝试查找目标 key，返回对应的 value
    for (var i = 0; i < list.length; i++) {
      if (list[i].key == key) {
        return list[i].value;
      }
    }

    // 链表中没有目标 key
    return -1;
  };

  // 增/改
  this.put = function (key, value) {
    var index = this.hash(key);

    if (this.table[index] == null) {
      // 链表为空，新建一个链表，插入 key-value
      this.table[index] = [];
      this.table[index].push(new KVNode(key, value));
      return;
    }

    // 链表不为空，要遍历一遍看看 key 是否已经存在
    // 如果存在，更新 value
    // 如果不存在，插入新节点
    var list = this.table[index];
    for (var i = 0; i < list.length; i++) {
      if (list[i].key == key) {
        // key 已经存在，更新 value
        list[i].value = value;
        return;
      }
    }

    // 链表中没有目标 key，添加新节点
    // 因为 JavaScript Array 的 push 方法时间复杂度是 O(1)
    list.push(new KVNode(key, value));
  };

  // 删
  this.remove = function (key) {
    var list = this.table[this.hash(key)];
    if (list == null) {
      return;
    }

    // 如果 key 存在，则删除，时间复杂度 O(N)
    for (var i = 0; i < list.length; i++) {
      if (list[i].key == key) {
        list.splice(i, 1);
        return;
      }
    }
  }
}

// 1. 拉链法
class MyChainingHashMap {
  // 拉链法使用的单链表节点，存储 key-value 对
  static KVNode = class {
    constructor(key, value) {
      this.key = key;
      this.value = value;
      // 因为我们使用了内置的数组，所以不用 next 指针
      // 不用我们自己实现链表的逻辑
    }
  };

  // 哈希表的底层数组，每个数组元素是一个链表，链表中每个节点是 KVNode 存储键值对
  table;

  // 哈希表中存入的键值对个数
  size;

  // 底层数组的初始容量
  static INIT_CAP = 4;

  constructor(initCapacity = MyChainingHashMap.INIT_CAP) {
    this.size = 0;
    // 保证底层数组的容量至少为 1，因为 hash 函数中有求余运算，避免出现除以 0 的情况
    initCapacity = Math.max(initCapacity, 1);
    // 初始化哈希表
    this.table = Array.from({ length: initCapacity }, () => []);
    console.log(this.table);
  }

  // **** 增/改 ****

  // 添加 key -> val 键值对
  // 如果键 key 已存在，则将值修改为 val
  put(key, val) {
    if (key === null) {
      throw new Error("key is null");
    }
    let list = this.table[this.hash(key)];
    // 如果 key 之前存在，则修改对应的 val
    for (let node of list) {
      if (node.key === key) {
        node.value = val;
        return;
      }
    }
    // 如果 key 之前不存在，则插入，size 增加
    list.push(new MyChainingHashMap.KVNode(key, val));
    this.size++;

    // 如果元素数量超过了负载因子，进行扩容
    if (this.size >= this.table.length * 0.75) {
      this.resize(this.table.length * 2);
    }
  }

  // **** 删 ****

  // 删除 key 和对应的 val
  remove(key) {
    if (key === null) {
      throw new Error("key is null");
    }
    let list = this.table[this.hash(key)];
    // 如果 key 存在，则删除，size 减少
    for (let i = 0; i < list.length; i++) {
      if (list[i].key === key) {
        list.splice(i, 1);
        this.size--;

        // 缩容，当负载因子小于 0.125 时，缩容
        if (this.size <= this.table.length / 8) {
          this.resize(Math.floor(this.table.length / 4));
        }
        return;
      }
    }
  }

  // **** 查 ****

  // 返回 key 对应的 val，如果 key 不存在，则返回 null
  get(key) {
    if (key === null) {
      throw new Error("key is null");
    }
    let list = this.table[this.hash(key)];
    for (let node of list) {
      if (node.key === key) {
        return node.value;
      }
    }
    return null;
  }

  // 返回所有 key
  keys() {
    let keys = [];
    for (let list of this.table) {
      for (let node of list) {
        keys.push(node.key);
      }
    }
    return keys;
  }

  // **** 其他工具函数 ****

  size() {
    return this.size;
  }

  // 哈希函数，将键映射到 table 的索引
  hash(key) {
    return Math.abs(key.hashCode ? key.hashCode() : this.defaultHash(key)) % this.table.length;
  }

  // 默认的哈希函数，适用于没有 hashCode 方法的对象
  defaultHash(key) {
    let hash = 0;
    const keyStr = key.toString();
    for (let i = 0; i < keyStr.length; i++) {
      // Math.imul 的
      hash = Math.imul(31, hash) + keyStr.charCodeAt(i) | 0;
    }
    return hash;
  }

  resize(newCap) {
    // 构造一个新的 HashMap
    // 避免 newCap 为 0，造成求模运算产生除以 0 的异常
    newCap = Math.max(newCap, 1);
    let newMap = new MyChainingHashMap(newCap);
    // 穷举当前 HashMap 中的所有键值对
    for (let list of this.table) {
      for (let node of list) {
        // 将键值对转移到新的 HashMap 中
        newMap.put(node.key, node.value);
      }
    }
    // 将当前 HashMap 的底层 table 换掉
    this.table = newMap.table;
  }
}

// 测试代码
const map = new MyChainingHashMap();
// map.put(1, 1);
// map.put(2, 2);
// map.put(3, 3);
// console.log(map.get(1)); // 1
// console.log(map.get(2)); // 2

// map.put(1, 100);
// console.log(map.get(1)); // 100

// map.remove(2);
// console.log(map.get(2)); // null
// console.log(map.keys()); // [1, 3] (order may vary)

// map.remove(1);
// map.remove(2);
// map.remove(3);
// console.log(map.get(1)); // null