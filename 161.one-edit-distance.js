/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isOneEditDistance = function (s, t) {
  let ns = s.length;
  let nt = t.length;

  // 保证s比t短
  if (ns > nt) {
    return isOneEditDistance(t, s);
  }

  // 如果t的长度 - s的长度大于1，说明不能通过“一步改变”来实现，返回false
  if (nt - ns > 1) return false;

  // 循环每一个字母
  for (let i = 0; i < ns; i++)
    // 如果s与t相同位置下的字母不相同
    if (s[i] != t[i])
      if (ns == nt)
        // 如果s与t的长度相同，则看看substring（从该位置往后一位，一直到后面）是否相同
        return s.substring(i + 1) === t.substring(i + 1);
      // 如果长度不同，则因为s比t短，看看删除t这个位置的字母后，即s：从该位置开始和t：从该位置往后一个开始到最后的substring是不是相同
      else return s.substring(i) === t.substring(i + 1);

  // 此举，排除“”和“”（即两个string完全相同的情况）.
  return ns + 1 == nt;
};
