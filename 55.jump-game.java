public class Solution {
     public boolean canJump(int[] nums) {
       if(nums.length < 2) return true;
       
       for(int curr = nums.length-2; curr>=0;curr--){
           if(nums[curr] == 0){
               int neededJumps = 1;
               while(neededJumps > nums[curr]){
                   neededJumps++;
                   curr--;
                   if(curr < 0) return false;
               }
           }
       }
       return true;
    }
}