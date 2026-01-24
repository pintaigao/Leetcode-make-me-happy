import UF from '../Algorithm/union-find'

var equationsPossible = function (equations) {
  // 26 个英文字母
  const uf = new UF(26);
  // 先让相等的字母形成连通分量
  for (const eq of equations) {
    if (eq.charAt(1) === '=') {
      const x = eq.charAt(0);
      const y = eq.charAt(3);
      uf.union(x.charCodeAt(0) - 'a'.charCodeAt(0), y.charCodeAt(0) - 'a'.charCodeAt(0));
    }
  }
  // 检查不等关系是否打破相等关系的连通性
  for (const eq of equations) {
    if (eq.charAt(1) === '!') {
      const x = eq.charAt(0);
      const y = eq.charAt(3);
      // 如果相等关系成立，就是逻辑冲突
      if (uf.connected(x.charCodeAt(0) - 'a'.charCodeAt(0), y.charCodeAt(0) - 'a'.charCodeAt(0))) {
        return false;
      }
    }
  }
  return true;
};
