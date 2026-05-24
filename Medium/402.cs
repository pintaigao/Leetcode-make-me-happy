using System;
using System.Collections.Generic;
using System.Text;

public class Solution {
  public string RemoveKdigits(string num, int k) {
    List<char> stk = new List<char>();

    foreach (char c in num) {
      // 单调栈：保持栈内数字尽量递增
      while (stk.Count > 0 && c < stk[stk.Count - 1] && k > 0) {
        stk.RemoveAt(stk.Count - 1);
        k--;
      }

      // 防止 0 作为数字开头
      if (stk.Count == 0 && c == '0') {
        continue;
      }

      stk.Add(c);
    }

    // 如果 k 还没用完，继续从尾部删除
    while (k > 0 && stk.Count > 0) {
      stk.RemoveAt(stk.Count - 1);
      k--;
    }

    if (stk.Count == 0) {
      return "0";
    }

    return new string(stk.ToArray());
  }

  public string RemoveKdigitsWithStack(string num, int k) {
    Stack<char> stk = new Stack<char>();
    foreach (char c in num) {
      while (stk.Count > 0 && c < stk.Peek() && k > 0) {
        stk.Pop();
        k--;
      }

      // 防止 0 作为数字开头
      if (stk.Count == 0 && c == '0') {
        continue;
      }

      stk.Push(c);
    }

    while (k > 0 && stk.Count > 0) {
      stk.Pop();
      k--;
    }

    if (stk.Count == 0) {
      return "0";
    }

    // Stack 弹出来是反序，所以要 reverse 回来
    char[] arr = stk.ToArray();
    Array.Reverse(arr);
    return new string(arr);
  }
}