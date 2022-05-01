/**
 * @param {string} s
 * @param {string[]} words
 * @return {string}
 */
var addBoldTag = function (s, words) {
  let bold = [];
  for (let i = 0, end = 0; i < s.length; i++) {
    for (let word of words) {
      if (s.startsWith(word, i)) {
        end = Math.max(end, i + word.length);
      }
    }
    bold[i] = end > i;
  }

  let result = "";
  for (let i = 0; i < s.length; i++) {
    if (!bold[i]) {
      result += s[i];
      continue;
    }
    let j = i;
    while (j < s.length && bold[j]) j++;
    result += "<b>" + s.substring(i, j) + "</b>";
    i = j - 1;
  }

  return result;
};

/* 用indexOf的方法 */
var addBoldTag2 = function (s, words) {
  const arr = new Array(s.length).fill(false);

  for (let word of words) {
    let index = s.indexOf(word);
    while (index !== -1 && index + word.length <= s.length) {
      for (let j = 0; j < word.length; j++) {
        arr[index + j] = true;
      }
      // 找下一个
      index = s.indexOf(word, index + 1);
    }
  }

  const ans = [];
  for (let i = 0; i < s.length; i++) {
    if (arr[i] && (i === 0 || !arr[i - 1])) ans.push("<b>");
    ans.push(s[i]);
    if (arr[i] && (i === s.length - 1 || !arr[i + 1])) ans.push("</b>");
  }
  return ans.join("");
};
