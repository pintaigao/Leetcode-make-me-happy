class Solution {
    public int[] origin;

    public Solution(int[] nums) {
        this.origin = nums;
    }

    /** Resets the array to its original configuration and return it. */
    public int[] reset() {
        return origin;
    }

    /** Returns a random shuffling of the array. */
    public int[] shuffle() {
        int[] result = origin.clone();
        for (int i = result.length - 1; i > 0; i--) {
            int index = ((int) Math.floor(Math.random() * (i + 1)));
            int temp = result[i];
            result[i] = result[index];
            result[index] = temp;
        }
        return result;
    }
}

/**
 * Your Solution object will be instantiated and called as such:
 * Solution obj = new Solution(nums);
 * int[] param_1 = obj.reset();
 * int[] param_2 = obj.shuffle();
 */