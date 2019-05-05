/**
 * @param {string}
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let map = {}
  let leftStartIndex = 0, result = 0;
  for (let index = 0; index < s.length; index++) {
    // console.log(`For now index is: ${index}`);
    let char = s[index];
    if (map[char] !== undefined) {
      // console.log("Oh the map contains this char: "+ char + "and map[char] value is:" + map[char]);
      leftStartIndex = map[char] + 1 > leftStartIndex ? map[char] + 1 : leftStartIndex;
      // console.log("And the new leftStartIndex will be:"+ leftStartIndex);
    }
    let lenght = index - leftStartIndex + 1;
    // console.log(lenght);
    result = result > lenght ? result : lenght;
    map[char] = index;
  }
  // console.log(result);
  return result;
};

// lengthOfLongestSubstring("pwwkew");
