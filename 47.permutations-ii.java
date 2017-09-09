public class Solution {
    public List<List<Integer>> permuteUnique(int[] num) {
        LinkedList<List<Integer>> res = new LinkedList<>();
        res.add(new ArrayList<>());
        for (int i = 0; i < num.length; i++) {
            Set<String> cache = new HashSet<>();
            while (res.peekFirst().size() == i) {
                List<Integer> l = res.removeFirst();
                for (int j = 0; j <= l.size(); j++) {
                    List<Integer> newL = new ArrayList<>(l.subList(0, j));
                    newL.add(num[i]);
                    newL.addAll(l.subList(j, l.size()));
                    if (cache.add(newL.toString()))
                        res.add(newL);
                }
            }
        }
        return res;
    }
}