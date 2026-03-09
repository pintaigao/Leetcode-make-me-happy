var isPalindrome = function (s) {
  // 先把所有字符转化成小写，并过滤掉空格和标点这类字符
  let sb = [];
  for (let i = 0; i < s.length; i++) {
    let c = s.charAt(i);
    if (/[a-zA-Z0-9]/.test(c)) {
      sb.push(c.toLowerCase());
    }
  }

  // 然后对剩下的这些目标字符执行双指针算法，判断回文串
  s = sb.join('');
  // 一左一右两个指针相向而行
  let left = 0, right = s.length - 1;
  while (left < right) {
    if (s.charAt(left) !== s.charAt(right)) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};