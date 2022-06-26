/*
 * @lc app=leetcode id=146 lang=javascript
 *
 * [146] LRU Cache
 */

// @lc code=start
/**
 * @param {number} capacity
 */

/* 建立Linked HashMap */
/* 一：建立基本的Node */
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next;
    this.prev;
  }
}

/* 二：建立双向链表 */
class DoubleList {
  constructor() {
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
    this.size = 0;
  }

  // 在链表尾部添加节点 x，时间 O(1)
  addLast(x) {
    x.prev = this.tail.prev;
    x.next = this.tail;
    this.tail.prev.next = x;
    this.tail.prev = x;
    this.size += 1;
  }

  // 删除链表中的 x 节点（x 一定存在）
  // 由于是双链表且给的是目标 Node 节点，时间 O(1)
  remove(x) {
    x.prev.next = x.next;
    x.next.prev = x.prev;
    this.size -= 1;
  }

  // 删除链表中第一个节点，并返回该节点，时间 O(1)
  removeFirst() {
    if (this.head.next == this.tail) return null;
    let first = this.head.next;
    this.remove(first);
    return first;
  }
}

class LRUCache {
  constructor(capacity) {
    // key -> Node(key, val)
    this.capacity = capacity;
    // Node(k1, v1) <-> Node(k2, v2)...
    this.map = {};
    // 最大容量
    this.cache = new DoubleList();
  }

  /* 
  由于我们要同时维护一个双链表 cache 和一个哈希表 map，很容易漏掉一些操作，比如说删除某个 key 时，在 cache 中删除了对应的 Node，但是却忘记在 map 中删除 key。
  解决这种问题的有效方法是：在这两种数据结构之上提供一层抽象 API。
  说的有点玄幻，实际上很简单，就是尽量让 LRU 的主方法 get 和 put 避免直接操作 map 和 cache 的细节。
  */

  /* 将某个 key 提升为最近使用的 */
  makeRecently(key) {
    let x = this.map[key];
    // 先从链表中删除这个节点
    this.cache.remove(x);
    // 重新插到队尾
    this.cache.addLast(x);
  }

  /* 添加最近使用的元素 */
  addRecently(key, val) {
    let x = new Node(key, val);
    // 链表尾部就是最近使用的元素
    this.cache.addLast(x);
    // 在 map 中添加 key 的映射
    this.map[key] = x;
  }

  /* 删除某一个 key */
  deleteKey(key) {
    let x = this.map[key];
    // 从链表中删除
    this.cache.remove(x);
    // 从 map 中删除
    delete this.map[key];
  }

  /* 删除最久未使用的元素 */
  removeLeastRecently() {
    // 链表头部的第一个元素就是最久未使用的
    let deletedNode = this.cache.removeFirst();
    // 同时别忘了从 map 中删除它的 key
    let deletedKey = deletedNode.key;
    delete this.map[deletedKey];
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.map[key]) {
      return -1;
    }
    // 将该数据提升为最近使用的
    this.makeRecently(key);
    return this.map[key].value;
  }
  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.map[key]) {
      // 删除旧的数据
      this.deleteKey(key);
      // 新插入的数据为最近使用的数据
      this.addRecently(key, value);
      return;
    }

    if (this.capacity == this.cache.size) {
      // 删除最久未使用的元素
      this.removeLeastRecently();
    }
    // 添加为最近使用的元素
    this.addRecently(key, value);
  }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
var obj = new LRUCache(2);
obj.put(1, 1);
var param_1 = obj.get(1);
console.log(param_1);
// @lc code=end
