class Solution {
	public int firstMissingPositive(int[] nums) {
		int i = 0;
		while (i < nums.length) {
			if (nums[i] != i + 1 && nums[i] >= 1 && nums[i] <= nums.length && nums[nums[i] - 1] != nums[i])
				swap(nums, i, nums[i] - 1);
			else
				i++;
		}

		for (i = 0; i < nums.length; i++) {
			if (nums[i] != i + 1)
				return i + 1;
		}
		return nums.length + 1;
	}

	public void swap(int[] nums, int p, int q) {
		int temp = nums[p];
		nums[p] = nums[q];
		nums[q] = temp;
	}
}