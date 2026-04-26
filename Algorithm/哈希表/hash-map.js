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