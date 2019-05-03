import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;



class Solution {
    public List<Integer> topKFrequent(int[] nums, int k) {
        int n = nums.length;
        HashMap<Integer,Integer> map = new HashMap();
        for(int i : nums)
            map.put(i, map.getOrDefault(i, 0) + 1);
        List<Integer>[] fc = new ArrayList[n+1];
        for(int i : map.keySet()){
            int f = map.get(i);
            if(fc[f] == null) fc[f] = new ArrayList<>();
            fc[f].add(i);
        }

        List<Integer> ans = new ArrayList<>();
        for(int i = n,j = 0;k > 0;k--){
            for(; fc[i] == null || j == fc[i].size(); j = 0,i--);
            ans.add(fc[i].get(j++));
        }
        return ans;
    }

}