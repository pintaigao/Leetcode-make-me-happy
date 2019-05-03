class Solution {
    public List<List<Integer>> findSubsequences(int[] nums) {
        Set<List<Integer>> result = new HashSet<List<Integer>>();
        List<Integer> temp = new ArrayList<Integer>();
        helper(result,temp,0,nums);
        List res = new ArrayList(result);
        return res;
    }
    public void helper(Set<List<Integer>> result,List<Integer> list,int index,int[] nums){
        if(list.size() >= 2){
            result.add(new ArrayList(list));
        }
        for(int i = index;i < nums.length;i++){
            if(list.size() == 0 || list.get(list.size()-1) <= nums[i]){
                list.add(nums[i]);
                helper(result,list,i+1,nums);
                list.remove(list.size()-1);
            }
        }
    }
}