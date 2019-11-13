/*
 * @lc app=leetcode id=937 lang=javascript
 *
 * [937] Reorder Data in Log Files
 */
/**
 * @param {string[]} logs
 * @return {string[]}
 */
// var reorderLogFiles = function (logs) {

//   function getLog(str) { // get after-identifier part of log
//     return str.slice(str.indexOf(' ') + 1);
//   }

//   function isDigitalStr(str) {  // the condition is that either ALL str[i] are digits or they ALL are symbols
//     // so we may check str[0] only
//     return (str[0] >= '0' && str[0] <= '9') ? true : false;
//   }

//   function compare(a, b) {  // main comparing function for 2 strings, if they're equal then compares identifiers
//     console.log(getLog(a), getLog(b));
//     let res = getLog(a).localeCompare(getLog(b));
//     console.log(res);
//     return (res == 0) ? -a.slice(0, a.indexOf(' ')).localeCompare(b.slice(0, b.indexOf(' '))) : res;
//   }

//   let resLogs = []; // the resulting array: all digital logs will go into it befor symbol logs
//   let symbolLogs = []; // the array for sorting symbol logs

//   for (let i = 0; i < logs.length; i++) {
//     if (isDigitalStr(getLog(logs[i])))
//       resLogs.push(logs[i]);
//     else
//       symbolLogs.push(logs[i]);
//   }
//   return [...symbolLogs.sort(compare), ...resLogs];
// };

// let res = reorderLogFiles(["dig1 8 1 5 1", "let3 art can", "dig2 3 6", "let1 own kit dig", "let2 art zero"]);
// console.log(res);

/**
 * @param {string[]} logs
 * @return {string[]}
 * 
 */

var reorderLogFiles = function (logs) {

  let getDigitLog = (string) => {
    let array = string.slice(string.indexOf(' ') + 1);
    if (array[0] >= '0' && array[0] <= '9') {
      return true;
    }
    return false;
  };

  let comparator = (a, b) => {
    let array1 = a.slice(a.indexOf(' ') + 1);
    let array2 = b.slice(b.indexOf(' ') + 1);
    let result = array1.localeCompare(array2);
    return result === 0 ? a.slice(0, a.indexOf(' ')).localeCompare(b.slice(0, b.indexOf(' '))) : result;
  }

  let digitArray = [];
  let stringArray = [];
  for (let i = 0; i < logs.length; i++) {
    if (getDigitLog(logs[i])) {
      digitArray.push(logs[i]);
    }
    else {
      stringArray.push(logs[i]);
    }
  }

  return [...stringArray.sort(comparator), ...digitArray];

}

// console.log(reorderLogFiles(["let1 art can", "let3 art zero", "let2 own kit dig"]));

