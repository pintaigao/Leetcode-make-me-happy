/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  const map = new Array(26);
  map.fill(0);

  for (let i = 0; i < p.length; i++) {
    map[p[i].charCodeAt() - 97]++;
  }

  let j = 0;
  const r = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i].charCodeAt() - 97;
    map[c]--;
    while (map[c] < 0) {
      const c2 = s[j++].charCodeAt() - 97;
      map[c2]++;
    }
    if (i - j + 1 === p.length) r.push(j);
  }

  return r;
};
