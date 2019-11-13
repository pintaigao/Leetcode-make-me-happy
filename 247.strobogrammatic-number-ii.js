/*
 * @lc app=leetcode id=247 lang=javascript
 *
 * [247] Strobogrammatic Number II
 */
/**
 * @param {number} n
 * @return {string[]}
 */
var findStrobogrammatic = function(n) {
  return helper(n, n);
};

var helper = function(n, m) {
  if (n == 0) return [""];
  if (n == 1) return ["0", "1", "8"];
  
  var list = helper(n - 2, m);
  
  var res = [];
  
  for (var i = 0; i < list.length; i++) {
      var s = list[i];
      
      if (n != m) res.push("0" + s + "0");
      
      res.push("1" + s + "1");
      res.push("6" + s + "9");
      res.push("8" + s + "8");
      res.push("9" + s + "6");
  }
  
  return res;
}

