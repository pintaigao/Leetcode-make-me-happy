
using System;
using System.Collections.Generic;

public class WordsFrequency {
  private Dictionary<string, int> map;

  public WordsFrequency(string[] book) {
    map = new Dictionary<string, int>();

    foreach (string word in book) {
      if (!map.ContainsKey(word)) {
        map[word] = 0;
      }

      map[word]++;
    }
  }

  public int Get(string word) {
    if (!map.ContainsKey(word)) {
      return 0;
    }

    return map[word];
  }
}