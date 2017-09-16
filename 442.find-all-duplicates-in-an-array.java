public class Solution {
	public List<Integer> findDuplicates(int[] nums) {
		int len = nums.length;
		for (int i = 0; i < len; i++) {
			nums[(nums[i] - 1) % len] += len;
		}
		List<Integer> res = new ArrayList<>();
		for (int i = 0; i < nums.length; i++) {
			if (nums[i] > 2 * len) {
				res.add(i + 1);
			}
		}
		return res;
	}
}