using System.Collections.Generic;
using System.Text;

public class Solution {
  public string MinRemoveToMakeValid(string s) {
    Stack<int> stack = new Stack<int>();
    HashSet<int> removeSet = new HashSet<int>();

    for (int i = 0; i < s.Length; i++) {
      if (s[i] == '(') {
        stack.Push(i);
      }
      else if (s[i] == ')') {
        if (stack.Count > 0) {
          stack.Pop();
        }
        else {
          // 没有左括号和他匹配，removeSet 添加这个 index
          removeSet.Add(i);
        }
      }
    }

    while (stack.Count > 0) {
      // 填加“没有右括号和它匹配“的左括号的 index
      removeSet.Add(stack.Pop());
    }

    StringBuilder result = new StringBuilder();

    for (int i = 0; i < s.Length; i++) {
      if (!removeSet.Contains(i)) {
        result.Append(s[i]);
      }
    }

    return result.ToString();
  }
}