class Solution {
	public int findLHS(int[] nums) {
		if (nums.length == 0) {
			return 0;
		}
		Arrays.sort(nums);
		int start = 0;
		int min = nums[0];
		int res = 0;
		int nextstart = 1;
		for (int i = 1; i < nums.length; i++) {
			if (nums[i] - min > 1) {
				start = nextstart++;
				min = nums[start];
				i--;
			} else if (nums[i] - min == 1) {
				res = Math.max(res, i - start + 1);
				if (nums[i] != nums[i - 1]) {
					nextstart = i;
				}
			}
		}
		return res;
	}
}