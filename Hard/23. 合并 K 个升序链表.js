// 1. 每次都比较然后取最小值 O(N*K)，N 是链表的平均长度，K 是链表的数量
var mergeKLists = function (lists) {
  if (lists.length === 0) return null;

  // 虚拟头结点
  // 优先级队列，最小堆
  let dummy = new ListNode(-1), p = dummy, pq = new PriorityQueue((a, b) => a.val - b.val), queue = []

  // 将 k 个链表的头结点加入最小堆
  for (var i = 0; i < lists.length; i++) {
    if (lists[i] !== null) {
      // pq.enqueue(lists[i]);
      queue.push(lists[i]);
    }
  }

  function getSmallestNodeFromQueue() {
    let min = undefined, recordIndex;
    queue.forEach((node, index) => {
      if (min == undefined || min.val >= node.val) {
        min = node;
        recordIndex = index;
      }
    });

    // remove node from list
    queue.splice(recordIndex, 1);
    return min;
  }

  while (queue.length) {
    // 获取最小节点，接到结果链表中
    // var node = pq.dequeue();
    var node = getSmallestNodeFromQueue();
    p.next = node;
    if (node.next !== null) {
      queue.push(node.next);
      // pq.enqueue(node.next);
    }
    // p 指针不断前进
    p = p.next;
  }

  return dummy.next;
}

// 2. Priority Queue，O(N*logK)，N 是链表的平均长度，K 是链表的数量
var mergeKLists = function (lists) {
  if (lists.length === 0) return null;

  // 虚拟头结点
  var dummy = new ListNode(-1);
  var p = dummy;

  // 优先级队列，最小堆
  var pq = new PriorityQueue((a, b) => a.val - b.val);

  // 将 k 个链表的头结点加入最小堆
  for (var i = 0; i < lists.length; i++) {
    if (lists[i] !== null) {
      pq.enqueue(lists[i]);
    }
  }

  while (!pq.isEmpty()) {
    // 获取最小节点，接到结果链表中
    var node = pq.dequeue();
    p.next = node;
    if (node.next !== null) {
      pq.enqueue(node.next);
    }
    // p 指针不断前进
    p = p.next;
  }

  return dummy.next;
}