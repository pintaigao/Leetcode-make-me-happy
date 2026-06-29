class TrieNode<V> {
  val: V | undefined;
  children: Array<TrieNode<V> | null>;

  constructor(radix: number) {
    this.val = undefined;
    this.children = new Array(radix).fill(null);
  }
}

class TrieMap<V> {
  // ASCII 码个数
  private static readonly R = 256;
  // 当前存在 Map 中的键值对个数
  private _size: number = 0;
  // Trie 树的根节点
  private root: TrieNode<V> | null = null;

  // 以上，隐式使用的 Constructor,通过直接赋值
  // 也可以像以下传统的方式
  // constructor() {
  //   this._size = 0;
  //   this.root = null;
  // }

  // **** 增 / 改 ****

  put(key: string, val: V): void {
    if (!this.containsKey(key)) {
      this._size++;
    }

    this.root = this._put(this.root, key, val, 0);
  }

  private _put(
    node: TrieNode<V> | null,
    key: string,
    val: V,
    i: number
  ): TrieNode<V> {
    if (node === null) {
      node = new TrieNode<V>(TrieMap.R);
    }

    if (i === key.length) {
      node.val = val;
      return node;
    }

    const c = this.getAsciiCode(key, i);
    node.children[c] = this._put(node.children[c], key, val, i + 1);

    return node;
  }

  // **** 删 ****

  remove(key: string): void {
    if (!this.containsKey(key)) {
      return;
    }

    this.root = this._remove(this.root, key, 0);
    this._size--;
  }

  private _remove(
    node: TrieNode<V> | null,
    key: string,
    i: number
  ): TrieNode<V> | null {
    if (node === null) {
      return null;
    }

    if (i === key.length) {
      node.val = undefined;
    } else {
      const c = this.getAsciiCode(key, i);
      node.children[c] = this._remove(node.children[c], key, i + 1);
    }

    // 如果该节点本身存着一个 key 的 value，不能删
    if (node.val !== undefined) {
      return node;
    }

    // 如果还有任何子节点，也不能删
    for (let c = 0; c < TrieMap.R; c++) {
      if (node.children[c] !== null) {
        return node;
      }
    }

    // 没有 value，也没有子节点，可以删除
    return null;
  }

  // **** 查 ****

  get(key: string): V | null {
    const x = this._getNode(this.root, key);

    if (x === null || x.val === undefined) {
      return null;
    }

    return x.val;
  }

  containsKey(key: string): boolean {
    const x = this._getNode(this.root, key);
    return x !== null && x.val !== undefined;
  }

  hasKeyWithPrefix(prefix: string): boolean {
    return this._getNode(this.root, prefix) !== null;
  }

  shortestPrefixOf(query: string): string {
    let p = this.root;

    for (let i = 0; i < query.length; i++) {
      if (p === null) {
        return "";
      }

      if (p.val !== undefined) {
        return query.substring(0, i);
      }

      const c = this.getAsciiCode(query, i);
      p = p.children[c];
    }

    if (p !== null && p.val !== undefined) {
      return query;
    }

    return "";
  }

  longestPrefixOf(query: string): string {
    let p = this.root;
    let maxLen = 0;

    for (let i = 0; i < query.length; i++) {
      if (p === null) {
        break;
      }

      if (p.val !== undefined) {
        maxLen = i;
      }

      const c = this.getAsciiCode(query, i);
      p = p.children[c];
    }

    if (p !== null && p.val !== undefined) {
      return query;
    }

    return query.substring(0, maxLen);
  }

  keysWithPrefix(prefix: string): string[] {
    const res: string[] = [];
    const x = this._getNode(this.root, prefix);

    if (x === null) {
      return res;
    }

    this._traverse(x, prefix.split(""), res);
    return res;
  }

  private _traverse(
    node: TrieNode<V> | null,
    path: string[],
    res: string[]
  ): void {
    if (node === null) {
      return;
    }

    if (node.val !== undefined) {
      res.push(path.join(""));
    }

    for (let c = 0; c < TrieMap.R; c++) {
      path.push(String.fromCharCode(c));
      this._traverse(node.children[c], path, res);
      path.pop();
    }
  }

  // **** 通配符 . 匹配任意字符 ****

  keysWithPattern(pattern: string): string[] {
    const res: string[] = [];
    this._traversePattern(this.root, [], pattern, 0, res);
    return res;
  }

  private _traversePattern(
    node: TrieNode<V> | null,
    path: string[],
    pattern: string,
    i: number,
    res: string[]
  ): void {
    if (node === null) {
      return;
    }

    if (i === pattern.length) {
      if (node.val !== undefined) {
        res.push(path.join(""));
      }
      return;
    }

    const ch = pattern[i];

    if (ch === ".") {
      for (let j = 0; j < TrieMap.R; j++) {
        path.push(String.fromCharCode(j));
        this._traversePattern(node.children[j], path, pattern, i + 1, res);
        path.pop();
      }
    } else {
      const c = this.getAsciiCode(pattern, i);
      path.push(ch);
      this._traversePattern(node.children[c], path, pattern, i + 1, res);
      path.pop();
    }
  }

  hasKeyWithPattern(pattern: string): boolean {
    return this._hasKeyWithPattern(this.root, pattern, 0);
  }

  private _hasKeyWithPattern(
    node: TrieNode<V> | null,
    pattern: string,
    i: number
  ): boolean {
    if (node === null) {
      return false;
    }

    if (i === pattern.length) {
      return node.val !== undefined;
    }

    const ch = pattern[i];

    if (ch !== ".") {
      const c = this.getAsciiCode(pattern, i);
      return this._hasKeyWithPattern(node.children[c], pattern, i + 1);
    }

    for (let j = 0; j < TrieMap.R; j++) {
      if (this._hasKeyWithPattern(node.children[j], pattern, i + 1)) {
        return true;
      }
    }

    return false;
  }

  private _getNode(node: TrieNode<V> | null, key: string): TrieNode<V> | null {
    let p = node;

    for (let i = 0; i < key.length; i++) {
      if (p === null) {
        return null;
      }

      const c = this.getAsciiCode(key, i);
      p = p.children[c];
    }

    return p;
  }

  size(): number {
    return this._size;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  private getAsciiCode(s: string, i: number): number {
    const code = s.charCodeAt(i);

    if (code >= TrieMap.R) {
      throw new Error(
        `Only ASCII characters are supported. Invalid character: "${s[i]}"`
      );
    }

    return code;
  }
}