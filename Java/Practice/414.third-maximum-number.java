class Solution {
    public int thirdMax(int[] nums) {
        long max = Long.MIN_VALUE,mid = max,min =max;
        for(int i : nums){
            if(i > max){
                min = mid;
                mid = max;
                max = i;
            }
            else if(i < max&& i > mid){
                min = mid;
                mid = i;
            }else if(i<mid && i > min){
                min = i;
            }
        }
        return (int)(min == Long.MIN_VALUE ? max:min);
    }
}