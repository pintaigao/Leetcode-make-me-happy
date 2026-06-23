using System.Collections.Generic;

public class Solution {
  public int LadderLength(string beginWord, string endWord, IList<string> wordList) {
    var wordSet = new HashSet<string>(wordList);
    if (!wordSet.Contains(endWord)) {
      return 0;
    }

    var beginSet = new HashSet<string> { beginWord };
    var endSet = new HashSet<string> { endWord };
    int step = 1;
    int length = beginWord.Length;

    while (beginSet.Count > 0 && endSet.Count > 0) {
      // Expand the smaller frontier to reduce branching.
      if (beginSet.Count > endSet.Count) {
        var temp = beginSet;
        beginSet = endSet;
        endSet = temp;
      }

      var nextSet = new HashSet<string>();

      foreach (var word in beginSet) {
        var chars = word.ToCharArray();
        for (int i = 0; i < length; i++) {
          char original = chars[i];

          for (char ch = 'a'; ch <= 'z'; ch++) {
            if (ch == original) {
              continue;
            }

            chars[i] = ch;
            string nextWord = new string(chars);

            if (endSet.Contains(nextWord)) {
              return step + 1;
            }

            if (wordSet.Contains(nextWord)) {
              nextSet.Add(nextWord);
              wordSet.Remove(nextWord);
            }
          }

          chars[i] = original;
        }
      }

      beginSet = nextSet;
      step++;
    }

    return 0;
  }
}
