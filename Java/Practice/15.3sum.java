

public class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
   
        Arrays.sort(nums);
        for(int i = 0;i+2<nums.length;i++){
            if (i > 0 && nums[i] == nums[i - 1]) { // skip same result
                continue;
            }
            int fixnum = -nums[i];
            int left = i+1,right = nums.length-1;
            while(left < right){
                if(nums[left]+nums[right] == fixnum){
                    res.add(Arrays.asList(nums[i],nums[left],nums[right]));
                    left++;
                    right--;
                    while(left < right && nums[left] == nums[left-1]){
                        left ++;
                    }
                    while(left < right && nums[right] == nums[right+1]){
                        right--;
                    }
                }else if(nums[left] + nums[right] > fixnum){
                    right --;
                }else{
                    left ++;
                }
            }
        }
        return res;
    }
}