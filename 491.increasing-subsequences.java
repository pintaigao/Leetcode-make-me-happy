public class Solution {
    public List<List<Integer>> findSubsequences(int[] nums) {
        int n = nums.length;
        
        TreeMap<Integer, List<List<Integer>>> map = new TreeMap<>();
        for (int i = 0; i < n; i ++) {
            
            List<List<Integer>> cur = map.get(nums[i]); // the list of sequences ending with current number
            if (cur == null) {
                cur = new ArrayList<>();
                map.put(nums[i], cur);
            }
            int size = cur.size();
            // retrieve all subsequences ending with the number smaller or equal than current number
            Map<Integer, List<List<Integer>>> submap = map.headMap(nums[i], true); 
            final int id = i;
            final List<List<Integer>> curList = cur;
            submap.forEach((k, v) -> {
                if (k == nums[id]) {
                    for (int j = 0; j < size; j ++) {
                        curList.get(j).add(nums[id]); // directly append the number in current subsequence
                    }
                } else {
                    for (List<Integer> list : v) {
                        List<Integer> nl = new ArrayList<>(list);
                        nl.add(nums[id]);
                        curList.add(nl);
                    }
                }
            });
            // Add current number as a list with single element for later use
            List<Integer> single = new ArrayList<>();
            single.add(nums[i]);
            cur.add(single);
        }
        
        List<List<Integer>> res = new ArrayList<>();
        for (List<List<Integer>> list : map.values()) {
            list.remove(list.size() - 1); // remove the list with single element
            res.addAll(list);
        }
        return res;
    }
}