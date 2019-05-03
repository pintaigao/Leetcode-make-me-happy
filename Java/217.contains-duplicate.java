public class Solution {
    public boolean containsDuplicate(int[] nums) {
        int min=Integer.MAX_VALUE;
        int max=Integer.MIN_VALUE;
        for(int b: nums){
            if(b<min){
                min=b;
            }
            if(b>max){
                max=b;
            }
        }
        boolean a[] = new boolean[max-min+1];
        for(int b: nums){
            if(a[b-min]){
                return true;
            }else{
                a[b-min]=true;
            }
        }
        return false;
    }
}