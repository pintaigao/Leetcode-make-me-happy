/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  let array = new Array(26).fill(0);

  for (let i = 0; i < s.length; i++) {
    array[s.charCodeAt(i) - 97] += 1;
  }

  for (let i = 0; i < t.length; i++) {
    array[t.charCodeAt(i) - 97] -= 1;
  }

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== 0) {
      return String.fromCharCode(i + 97);
    }
  }
};