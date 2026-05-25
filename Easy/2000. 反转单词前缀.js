var reversePrefix = function (word, ch) {
  let arr = word.split('');
  let index = word.indexOf(ch);
  if (index === -1) return word;

  for (let left = 0, right = index; left < right; left++, right--) {
    // 交换左右指针位置的字符
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    // 或者这么写
    // [arr[left], arr[right]] = [arr[right], arr[left]];
  }
  return arr.join('');
};