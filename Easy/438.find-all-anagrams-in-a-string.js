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

    if (map[c] < 0) {
      console.log("map[c] is < 0 and c is " + c);
    }

    while (map[c] < 0) {
      console.log("Before j++ j is: " + j);
      const c2 = s[j++].charCodeAt() - 97;
      map[c2]++;
      console.log("Now the new map will be:");
      console.log(map);
    }

    if (i - j + 1 === p.length) {
      console.log("J will be push and j is:" + j);
      r.push(j);
    };
    console.log();
  }

  return r;
};


findAnagrams("cbaebabacd", "abc");
