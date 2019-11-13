/*
 * @lc app=leetcode id=249 lang=javascript
 *
 * [249] Group Shifted Strings
 */
/**
 * @param {string[]} strings
 * @return {string[][]}
 */
var groupStrings = function(strings) {
  var result = [];
  var groups = new Map();
  strings.forEach(function(element) {
      let key = "";
      let offset = element.charCodeAt(0) - 97;
      for (let i = 0; i < element.length; i++) {
          let base = element.charCodeAt(i) - offset;
          if (base < 97) {
              base += 26;
              
          }
          console.log(base);
          key += String.fromCharCode(base);
      }

      console.log(key);

      if (groups.has(key)) {
          result[groups.get(key)].push(element);
      } else {
          result.push([element]);
          groups.set(key, result.length-1);
      }
  });
  return result;
};
groupStrings(["abc", "bcd", "fcd","acef", "xyz", "fa", "az", "ba", "a", "z"]);

