/*
 * @lc app=leetcode id=93 lang=javascript
 *
 * [93] Restore IP Addresses
 */
/**
 * @param {string} s
 * @return {string[]}
 */
function restoreIpAddresses(s) {
  const res = [];
  let prefix = [];

  let dfs = function (idx) {
    if (prefix.length === 4 && idx === s.length) {
      res.push(prefix.join("."));
      return;
    }

    if (prefix.length === 4 || idx === s.length) {
      return;
    }

    for (let r = idx; r < s.length; r++) {
      if (r !== idx && s[idx] === "0") return;

      const num = parseInt(s.slice(idx, r + 1));

      if (num > 255) {
        return;
      }
      prefix.push(num);

      dfs(r + 1);
      prefix.pop();
    }
  };

  dfs(0);
  return res;
}

restoreIpAddresses("7025511135");
