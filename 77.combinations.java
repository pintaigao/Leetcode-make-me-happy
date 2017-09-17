public class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            list.add(i+1);
            combinehelper(n, k-1, result, list, i+1);
            list.remove(list.size()-1);
        }
        return result;
    }

    public void combinehelper(int n, int k, List<List<Integer>> result, List<Integer> list, int number) {
        if (k == 0) {
            result.add(list);
            return;
        } else {
            while (number != n) {
                number  = number + 1;
                list.add(number);
                combinehelper(n, k-1,result, list, number );
                list.remove(list.size()-1);
            }
        }
    }
}