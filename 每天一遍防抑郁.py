from typing import List
from collections import deque, defaultdict


class Solution:
  def function(self, n: int, relations: List[List[int]]) -> int:
    """
    JavaScript -> Python 转换速查
    重点：刷 LeetCode 时，把 JS 思维转换成 Python 写法。
    JS 对应写法会放在 comment 里。
    """

    # =========================
    # 1. Array / List
    # =========================

    # JS: let arr = [];
    arr = []

    # JS: let arr = new Array(n).fill(0);
    n = 5
    arr = [0] * n

    # JS: let graph = Array.from({ length: n }, () => []);
    # 注意：Python 不要写 [[]] * n，因为内部 list 会共享
    graph = [[] for _ in range(n)]

    # JS: s.split("")
    s = "abc"
    chars = list(s)

    # JS: arr.push(x)
    arr.append(1)

    # JS: arr.pop()
    arr.pop()

    # JS: arr.unshift(x)
    arr.insert(0, 1)

    # JS: arr.shift()
    arr.pop(0)

    # JS: arr.splice(start, deleteCount)
    start = 1
    delete_count = 2
    del arr[start:start + delete_count]

    # JS: arr.slice(start, end)
    arr2 = arr[start:start + delete_count]

    # JS: arr.join("")
    result = ''.join(chars)

    # JS: res.reverse()  // 原地 reverse，并返回数组本身
    # Python: list.reverse() 原地 reverse，但是返回 None
    arr.reverse()

    # JS: return hasCycle ? [] : res.reverse()
    # Python 三元表达式
    has_cycle = False
    res = [1, 2, 3]
    answer = [] if has_cycle else res[::-1]


    # =========================
    # 2. Dict / Object / Map
    # =========================

    from collections import defaultdict

    # JS: let dict = {};
    dict1 = {}

    # JS: let map = new Map();
    map1 = {}

    # JS:
    # map[pre] = (map[pre] || []).concat(course);
    # map[course] = map[course] || [];
    graph_dict = {}
    pre = 0
    course = 1
    graph_dict[pre] = graph_dict.get(pre, []) + [course]
    graph_dict[course] = graph_dict.get(course, [])

    # Python 更常用：
    # JS: let dict = {};
    # 如果 value 是 list，可以用 defaultdict(list)
    graph = defaultdict(list)
    graph[pre].append(course)

    # JS: if (key in obj)
    key = 1
    if key in graph:
      pass

    # JS: if (!map.has(key))
    if key not in graph:
      pass

    # JS: map.get(key) || defaultValue
    value = graph_dict.get(key, [])

    # JS: map.set(key, value)
    graph_dict[key] = value

    # JS: Object.keys(obj)
    keys = graph_dict.keys()

    # JS: Object.values(obj)
    values = graph_dict.values()

    # JS: Object.entries(obj)
    entries = graph_dict.items()


    # =========================
    # 3. Set
    # =========================

    # JS: let visited = new Set();
    visited = set()

    # JS: visited.add(x)
    visited.add(1)

    # JS: visited.has(x)
    if 1 in visited:
      pass

    # JS: visited.delete(x)
    visited.remove(1)      # 如果不存在会报错
    visited.discard(1)     # 如果不存在不会报错


    # =========================
    # 4. Queue / BFS
    # =========================

    from collections import deque

    # JS: let queue = [];
    queue = deque()

    # JS: queue.push(x)
    queue.append(1)

    # JS: queue.shift()
    x = queue.popleft()

    # JS: while (queue.length)
    while queue:
      break

    # JS: queue.length
    length = len(queue)


    # =========================
    # 5. PriorityQueue / Heap
    # =========================

    import heapq

    # JS: const pq = new PriorityQueue((a, b) => a[0] - b[0]);
    # Python heapq 默认是 min heap，小的先出来
    pq = []

    # JS: pq.enqueue([dist, node])
    dist = 3
    node = 2
    heapq.heappush(pq, (dist, node))

    # JS: const [curDist, curNode] = pq.dequeue();
    cur_dist, cur_node = heapq.heappop(pq)

    # JS: pq.isEmpty()
    if not pq:
      pass

    # Python tuple 会先比较第一项，所以 (dist, node) 会按照 dist 排序
    # 如果要 max heap，把 priority 变成负数
    heapq.heappush(pq, (-dist, node))


    # =========================
    # 6. For Loop
    # =========================

    # JS: for (let i = 0; i < n; i++)
    for i in range(n):
      pass

    # JS: for (let i = n - 1; i >= 0; i--)
    for i in range(n - 1, -1, -1):
      pass

    # JS: for (let item of arr)
    for item in arr:
      pass

    # JS: for (let [course, pre] of prerequisites)
    prerequisites = [[1, 0], [2, 0]]
    for course, pre in prerequisites:
      pass


    # =========================
    # 7. Function / Nested Function
    # =========================

    # JS:
    # let hasCycle = false;
    # function dfs(course) {
    #   hasCycle = true;
    # }
    # Python 如果内部函数要修改外层变量，需要 nonlocal
    def outer():
      has_cycle = False

      def dfs(course):
        nonlocal has_cycle
        has_cycle = True

      dfs(0)
      return has_cycle


    # =========================
    # 8. String
    # =========================

    # JS: s[i]
    ch = s[0]

    # JS: s.charCodeAt(i) - 'A'.charCodeAt(0)
    idx = ord(s[0]) - ord('A')

    # JS: s.substring(0, i) + s.substring(i + 1)
    i = 1
    new_s = s[:i] + s[i + 1:]


    # =========================
    # 9. Infinity
    # =========================

    # JS: Infinity
    inf = float("inf")

    # JS: -Infinity
    neg_inf = float("-inf")


    # =========================
    # 10. Sort
    # =========================

    people = [[7, 0], [4, 4], [7, 1]]

    # JS: people.sort((a, b) => b[0] - a[0] || a[1] - b[1])
    people.sort(key=lambda p: (-p[0], p[1]))

    # JS: arr.sort((a, b) => a - b)
    arr.sort()

    # JS: arr.sort((a, b) => b - a)
    arr.sort(reverse=True)


    # =========================
    # 11. 常见 LeetCode 类型
    # =========================

    from typing import List, Optional

    # JS:
    # var func = function(nums) {}
    # Python:
    class Solution:
      def func(self, nums: List[int]) -> int:
        return 0

    # JS: return []
    empty_list = []

    # JS: return ""
    empty_string = ""

    # JS: return true / false
    boolean_value = True
    boolean_value = False
