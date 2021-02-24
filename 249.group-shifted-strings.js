/*
 * @lc app=leetcode id=249 lang=javascript
 *
 * [249] Group Shifted Strings
 */
/**
 * @param {string[]} strings
 * @return {string[][]}
 */
var groupStrings = function (strings) {
  var result = [];
  var groups = {};

  strings.forEach((char) => {
    console.log("Now char is:" + char);
    let key = "";
    let offset = char.charCodeAt(0) - "a".charCodeAt(0);
    for (let i = 0; i < char.length; i++) {
      let base = char.charCodeAt(i) - offset;
      if (base < "a".charCodeAt(0)) {
        base += 26;
      }
      console.log(base);
      key += String.fromCharCode(base);
    }

    console.log(key);
    console.log(groups);

    if (groups.hasOwnProperty(key)) {
      result[groups[key]].push(char);
    } else {
      result.push([char]);
      groups[key] = result.length - 1;
    }
    console.log();
  });

  return result;
};
groupStrings(["abc", "bcd", "fcd", "acef", "xyz", "fa", "az", "ba", "a", "z"]);
