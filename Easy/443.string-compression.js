/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
  chars.sort();
  if (chars.length === 0) {
    return 0;
  }

  if (chars.length === 1) {
    return 1;
  }


  let currentChar = chars[0];
  let count = 0;
  let result = [];

  while (chars.length) {
    let char = chars.shift();
    if (char == currentChar) {
      count++;
    } else {
      if (count == 1) {
        result.push(char);
      } else {
        let length = count.toString().split("");
        result.push(currentChar);
        result.concat(length);
      }
      currentChar = char;
      count = 1;
    }
  }
  
  if (count == 1) {
    result.push(currentChar);
  } else {
    let length = count.toString().split("");
    result.push(currentChar);
    result.concat(length);
  }

  return result;
};