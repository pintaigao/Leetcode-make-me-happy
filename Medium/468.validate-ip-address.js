/*
 * @lc app=leetcode id=468 lang=javascript
 *
 * [468] Validate IP Address
 */

// @lc code=start
/**
 * @param {string} queryIP
 * @return {string}
 */
var validIPAddress = function (queryIP) {
  let validateIPv4 = function (IP) {
    let nums = IP.split(".");
    for (let x of nums) {
      // Validate integer in range (0, 255):
      // 1. length of chunk is between 1 and 3
      if (x.length == 0 || x.length > 3) return "Neither";
      // 2. no extra lesading zeros
      if (x[0] == "0" && x.length != 1) return "Neither";
      // 3. only digits are allowed
      for (let ch of x.split("")) {
        if (!Number.isInteger(Number(ch))) return "Neither";
      }
      // 4. less than 255
      if (Number(x) > 255) return "Neither";
    }
    return "IPv4";
  };

  let validateIPv6 = function (IP) {
    let nums = IP.split(":");
    let hexdigits = "0123456789abcdefABCDEF";
    for (let x of nums) {
      // Validate hexadecimal in range (0, 2**16):
      // 1. at least one and not more than 4 hexdigits in one chunk
      if (x.length == 0 || x.length > 4) return "Neither";
      // 2. only hexdigits are allowed: 0-9, a-f, A-F
      for (let ch of x.split("")) {
        if (hexdigits.indexOf(ch) == -1) return "Neither";
      }
    }
    return "IPv6";
  };

  let dotSeparation = IP.split("."),
    columnSeparation = IP.split(":");
  if (dotSeparation.length === 4) {
    return validateIPv4(IP);
  } else if (columnSeparation.length === 8) {
    return validateIPv6(IP);
  } else return "Neither";
};
// @lc code=end
