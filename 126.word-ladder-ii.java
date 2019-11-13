/*
 * @lc app=leetcode id=126 lang=java
 *
 * [126] Word Ladder II
 */

// @lc code=start
class Solution {
    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {

        List<List<String>> res = new ArrayList<>();
        Set<String> dict = new HashSet<>(wordList);
        if (!dict.contains(endWord))
            return res;
        Set<String> begin = new HashSet<>();
        Set<String> end = new HashSet<>();
        begin.add(beginWord);
        end.add(endWord);
        Map<String, List<String>> map = new HashMap<String, List<String>>();

        bfs(dict, begin, end, map);
        List<String> temp = new ArrayList<>(Arrays.asList(beginWord));
        dfs(res, temp, beginWord, endWord, map);

        return res;
    }

    private void bfs(Set<String> dict, Set<String> begin, Set<String> end, Map<String, List<String>> map) {

        boolean reversed = false;
        boolean terminate = false;
        while (begin.size() > 0) {
            dict.removeAll(begin);
            dict.removeAll(end);
            if (begin.size() > end.size()) {
                reversed = !reversed;
                Set<String> temp = new HashSet<>(begin);
                begin = end;
                end = temp;
            }
            Set<String> set = new HashSet<>();
            for (String s : begin) {
                for (int i = 0; i < s.length(); i++) {
                    char[] ch = s.toCharArray();

                    for (char c = 'a'; c <= 'z'; c++) {
                        if (ch[i] == c)
                            continue;
                        ch[i] = c;
                        String word = new String(ch);


                        if (end.contains(word)) {
                            if (!reversed) {
                                List<String> list = map.containsKey(s) ? map.get(s) : new ArrayList<>();
                                list.add(word);
                                map.put(s, list);
                            } else {
                                List<String> list = map.containsKey(word) ? map.get(word) : new ArrayList<>();
                                list.add(s);
                                map.put(word, list);
                            }
                            terminate = true;
                        }

                        
                        if (dict.contains(word)) {
                            if (!reversed) {
                                List<String> list = map.containsKey(s) ? map.get(s) : new ArrayList<>();
                                list.add(word);
                                map.put(s, list);
                            } else {
                                List<String> list = map.containsKey(word) ? map.get(word) : new ArrayList<>();
                                list.add(s);
                                map.put(word, list);
                            }
                            set.add(word);
                        }
                    }
                }
            }
            begin = set;
            if (terminate)
                return;
        }

        return;
    }

    private void dfs(List<List<String>> res, List<String> temp, String start, String end,
            Map<String, List<String>> map) {

        if (start.equals(end)) {
            res.add(new ArrayList<>(temp));
            return;
        }
        if (!map.containsKey(start))
            return;

        for (String word : map.get(start)) {
            temp.add(word);
            dfs(res, temp, word, end, map);
            temp.remove(temp.size() - 1);
        }
    }
}
// @lc code=end
