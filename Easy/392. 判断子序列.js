/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isSubsequence = function (s, t) {
  let ps = 0, pt = 0;
  while (pt < t.length) {
    if (s[ps] == t[pt]) {
      ps += 1;
    }

    if (ps === s.length) return true;

    pt += 1;
  }
};