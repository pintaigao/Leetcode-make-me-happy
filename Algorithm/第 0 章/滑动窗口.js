// 滑动窗口算法伪码框架
var slidingWindow = function (s) {
  // 用合适的数据结构记录窗口中的数据，根据具体场景变通
  // 比如说，我想记录窗口中元素出现的次数，就用 map
  // 如果我想记录窗口中的元素和，就可以只用一个 int
  var window = ...;

  var left = 0, right = 0;
  while (right < s.length) {
    // c 是将移入窗口的字符
    var c = s[right];
    window.add(c);
    // 增大窗口
    right++;
    // 进行窗口内数据的一系列更新
    // ...

    // *** debug 输出的位置 ***
    // 注意在最终的解法代码中不要 print
    // 因为 IO 操作很耗时，可能导致超时
    console.log("window: [%d, %d)\n", left, right);
    // *********************

    // 判断左侧窗口是否要收缩
    while (window needs shrink) {
      // d 是将移出窗口的字符
      var d = s[left];
      window.remove(d);
      // 缩小窗口
      left++;
      // 进行窗口内数据的一系列更新
      // ...
    }
  }
};