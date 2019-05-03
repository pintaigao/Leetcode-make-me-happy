public class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        HashSet<Integer> hs = new HashSet<>();
        for (int i = 0; i < nums.length; i++) {
            if (hs.add(nums[i]) == false)
                return true;
            if (hs.size() == k + 1)
                hs.remove(nums[i - k]);
        }
        return false;
    }
}