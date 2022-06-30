/*
 * @lc app=leetcode id=811 lang=javascript
 *
 * [811] Subdomain Visit Count
 */

// @lc code=start
/**
 * @param {string[]} cpdomains
 * @return {string[]}
 */
var subdomainVisits = function (cpdomains) {
  let map = {};
  helper = (domain, count) => {
    let [domainArray, currDomain] = [domain.split("."), ""];
    for (let i = domainArray.length - 1; i >= 0; i--) {
      currDomain = domainArray[i] + (i < domainArray.length - 1 ? "." : "") + currDomain;
      map[currDomain] = (map[currDomain] || 0) + count;
    }
  };

  for (let cpdomain of cpdomains) {
    let cpdomainArray = cpdomain.split(" ");
    helper(cpdomainArray[1], parseInt(cpdomainArray[0]));
  }

  let result = [];

  for (let [key, value] of Object.entries(map)) {
    result.push(value + " " + key);
  }
  return result;
};

// @lc code=end
