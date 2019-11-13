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
        let domainArray = domain.split("\.");
        let currDomain = "";
        for (let i = domainArray.length - 1; i >= 0; i--) {
            currDomain = domainArray[i] + (i < domainArray.length - 1 ? "." : "") + currDomain;
            if (map[currDomain] === undefined) {
                map[currDomain] = count;
            }
            else {
                map[currDomain] += count;
            }
        }
    }

    cpdomains.forEach((cpdomain) => {
        let cpdomainArray = cpdomain.split(" ");
        helper(cpdomainArray[1], parseInt(cpdomainArray[0]));
    });
    let result = [];
    for (let {key, value} of Object.entries(map)) {
        let tempResult = value + " " + key;
        result.push(tempResult)
    }
    return result;
};

console.log(subdomainVisits(["900 google.mail.com", "50 yahoo.com", "1 intel.mail.com", "5 wiki.org"]));


// @lc code=end


