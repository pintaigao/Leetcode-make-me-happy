var isPalindrome = function (s) {
  // 先把所有字符转化成小写，并过滤掉空格和标点这类字符
  let sb = [];
  for (let i = 0; i < s.length; i++) {
    let c = s.charAt(i);
    if (/[a-zA-Z0-9]/.test(c)) {
      sb.push(c.toLowerCase());
    }
  }

  // 一左一右两个指针相向而行
  let left = 0, right = sb.length - 1;
  while (left < right) {
    if (sb[left] !== sb[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

isPalindrome("A man, a plan, a canal: Panama")