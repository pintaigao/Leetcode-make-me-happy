class TrieMap {
  // ASCII 码个数
  static R = 256;

  constructor() {
    // 当前存在 Map 中的键值对个数
    this._size = 0;
    // Trie 树的根节点
    this.root = null;
  }

  // **** 增/改 ****
  // 在 map 中添加或修改键值对
  put(key, val) {
    if (!this.containsKey(key)) {
      // 新增键值对
      this._size++;
    }
    // 需要一个额外的辅助函数，并接收其返回值
    this.root = this._put(this.root, key, val, 0);
  }

  // 定义：向以 node 为根的 Trie 树中插入 key[i..]，返回插入完成后的根节点
  // i: 当前处理的字符索引
  _put(node, key, val, i) {
    if (node === null) {
      // 如果树枝不存在，新建 children: TrieNode[]
      // TrieNode { val: any, children: TrieNode[] }
      node = { val: null, children: new Array(TrieMap.R).fill(null) };
    }
    if (i === key.length) {
      // key 的路径已插入完成，将值 val 存入节点
      // 这一步，说明返回值 x 非空，也只能说字符串 key 是一个「前缀」；除非 x.val 同时非空，才能判断键 key 存在。
      node.val = val;
      return node;
    }
    const c = key.charCodeAt(i);
    // 递归插入子节点，并接收返回值, i + 1: 长度 + 1
    node.children[c] = this._put(node.children[c], key, val, i + 1);
    return node;
  }

  // **** 删 ****
  // 在 Map 中删除 key
  remove(key) {
    if (!this.containsKey(key)) {
      return;
    }
    // 递归修改数据结构要接收函数的返回值
    this.root = this._remove(this.root, key, 0);
    this._size--;
  }

  // 定义：在以 node 为根的 Trie 树中删除 key[i..]，返回删除后的根节点
  _remove(node, key, i) {
    if (node === null) {
      return null;
    }
    if (i === key.length) {
      // 找到了 key 对应的 TrieNode，删除 val
      node.val = null;
    } else {
      const c = key.charCodeAt(i);
      // 递归去子树进行删除
      node.children[c] = this._remove(node.children[c], key, i + 1);
    }
    // 后序位置，递归路径上的节点可能需要被清理
    if (node.val !== null) {
      // 如果该 TireNode 存储着 val，不需要被清理
      return node;
    }
    // 检查该 TrieNode 是否还有后缀
    for (let c = 0; c < TrieMap.R; c++) {
      if (node.children[c] !== null) {
        // 只要存在一个子节点（后缀树枝），就不需要被清理
        return node;
      }
    }
    // 既没有存储 val，也没有后缀树枝，则该节点需要被清理
    return null;
  }

  // **** 查 ****
  // 搜索 key 对应的值，不存在则返回 null
  get(key) {
    // 从 root 开始搜索 key
    const x = this._getNode(this.root, key);
    if (x === null || x.val === null) {
      // x 为空或 x 的 val 字段为空都说明 key 没有对应的值
      return null;
    }
    return x.val;
  }

  // 判断 key 是否存在在 Map 中
  containsKey(key) { return this.get(key) !== null; }

  // 判断是和否存在前缀为 prefix 的键
  hasKeyWithPrefix(prefix) {
    // 只要能找到一个节点，就是存在前缀
    // _getNode return p;
    return this._getNode(this.root, prefix) !== null;
  }

  // 在所有键中寻找 query 的最短前缀
  shortestPrefixOf(query) {
    let p = this.root;
    // 从节点 node 开始搜索 key 还是一样遍历每个字母
    for (let i = 0; i < query.length; i++) {
      if (p === null) {
        // 无法向下搜索
        return "";
      }
      if (p.val !== null) {
        // 找到一个键是 query 的前缀
        return query.substring(0, i);
      }
      // 向下搜索
      const c = query.charCodeAt(i);
      p = p.children[c];
    }
    if (p !== null && p.val !== null) {
      // 如果 query 本身就是一个键
      return query;
    }
    return "";
  }

  // 在所有键中寻找 query 的最长前缀
  longestPrefixOf(query) {
    // 记录前缀的最大长度
    let p = this.root, maxLen = 0;
    // 从节点 node 开始搜索 key
    for (let i = 0; i < query.length; i++) {
      if (p === null) {
        // 无法向下搜索
        break;
      }
      if (p.val !== null) {
        // 找到一个键是 query 的前缀，更新前缀的最大长度
        maxLen = i;
      }
      // 向下搜索
      const c = query.charCodeAt(i);
      p = p.children[c];
    }
    if (p !== null && p.val !== null) {
      // 如果 query 本身就是一个键
      return query;
    }
    return query.substring(0, maxLen);
  }

  // 搜索前缀为 prefix 的所有键
  keysWithPrefix(prefix) {
    const res = [];
    // 找到匹配 prefix 在 Trie 树中的那个节点
    const x = this._getNode(this.root, prefix);
    if (x === null) {
      return res;
    }
    // DFS 遍历以 x 为根的这棵 Trie 树
    this._traverse(x, prefix.split(''), res);
    return res;
  }

  // 遍历以 node 节点为根的 Trie 树，找到所有键
  _traverse(node, path, res) {
    if (node === null) {
      // 到达 Trie 树底部叶子结点
      return;
    }
    if (node.val !== null) {
      // 找到一个 key，添加到结果列表中
      res.push(path.join(''));
    }
    // 回溯算法遍历框架
    for (let c = 0; c < TrieMap.R; c++) {
      // 做选择
      path.push(String.fromCharCode(c));
      this._traverse(node.children[c], path, res);
      // 撤销选择
      path.pop();
    }
  }

  // 通配符 . 匹配任意字符
  keysWithPattern(pattern) {
    const res = [];
    this._traversePattern(this.root, [], pattern, 0, res);
    return res;
  }

  // 遍历函数，尝试在「以 node 为根的 Trie 树中」匹配 pattern[i..]
  _traversePattern(node, path, pattern, i, res) {
    if (node === null) {
      // 树枝不存在，即匹配失败
      return;
    }
    if (i === pattern.length) {
      // pattern 匹配完成
      if (node.val !== null) {
        // 如果这个节点存储着 val，则找到一个匹配的键
        res.push(path.join(''));
      }
      return;
    }
    const c = pattern[i];
    if (c === '.') {
      // pattern[i] 是通配符，可以变化成任意字符
      for (let j = 0; j < TrieMap.R; j++) {
        path.push(String.fromCharCode(j));
        this._traversePattern(node.children[j], path, pattern, i + 1, res);
        path.pop();
      }
    } else {
      // pattern[i] 是普通字符 c
      path.push(c);
      this._traversePattern(node.children[c.charCodeAt(0)], path, pattern, i + 1, res);
      path.pop();
    }
  }

  // 判断是和否存在前缀为 prefix 的键
  hasKeyWithPattern(pattern) {
    // 从 root 节点开始匹配 pattern[0..]
    return this._hasKeyWithPattern(this.root, pattern, 0);
  }

  // 函数定义：从 node 节点开始匹配 pattern[i..]，返回是否成功匹配
  _hasKeyWithPattern(node, pattern, i) {
    if (node === null) {
      // 树枝不存在，即匹配失败
      return false;
    }
    if (i === pattern.length) {
      // 模式串走到头了，看看匹配到的是否是一个键
      return node.val !== null;
    }
    const c = pattern[i];
    // 没有遇到通配符
    if (c !== '.') {
      // 从 node.children[c] 节点开始匹配 pattern[i+1..]
      return this._hasKeyWithPattern(node.children[c.charCodeAt(0)], pattern, i + 1);
    }
    // 遇到通配符
    for (let j = 0; j < TrieMap.R; j++) {
      // pattern[i] 可以变化成任意字符，尝试所有可能，只要遇到一个匹配成功就返回
      if (this._hasKeyWithPattern(node.children[j], pattern, i + 1)) {
        return true;
      }
    }
    // 都没有匹配
    return false;
  }

  // 从节点 node 开始搜索 key，如果存在返回对应节点，否则返回 null
  _getNode(node, key) {
    let p = node;
    // 从节点 node 开始搜索 key，遍历key 的每个字母
    for (let i = 0; i < key.length; i++) {
      if (p === null) {
        // 无法向下搜索
        return null;
      }
      // 向下搜索， children：TrieNode[] * 256
      p = p.children[key.charCodeAt(i)];
    }
    return p;
  }

  size() {
    return this._size;
  }
}