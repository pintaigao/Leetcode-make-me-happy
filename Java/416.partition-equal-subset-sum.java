class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for(int i : nums)
            sum += i;
        if(sum%2 != 0)
            return false;
        sum = sum /2;
        boolean[] result = new boolean[sum+1];
        result[0] = true;
        for(int i :nums){
            for(int k = sum;k >= i;k--){
                result[k] = result[k] || result[k-i];
            }
        }
        return result[sum];
    }
}