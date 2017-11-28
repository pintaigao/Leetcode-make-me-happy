class Solution {
    public int firstMissingPositive(int[] nums) {
        for(int i = 0;i<nums.length;i++){
            if(nums[i] != i+1 &&  nums[i] >=1 && nums[i] <= nums.length && nums[nums[i]-1] != nums[i])
                swap(nums,i,nums[i]-1);
		}
		
		for(int i : nums){
			System.out.print(i + " " );
		}
        
        for(int i = 0;i<nums.length;i++){
            if(nums[i] != i+1)
                return i+1;
        }
        return nums.length +1;
    }
    
    public void swap(int[] nums,int p,int q){
            int temp = nums[p];
            nums[p] = nums[q];
            nums[q] = temp;
	}
	public static void main(String[] args) {
		Solution s= new Solution();
		int[] nums = {3,4,-1,1};
		int result = s.firstMissingPositive(nums);

	}
}