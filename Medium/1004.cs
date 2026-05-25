public class Solution {
  public int LongestOnes(int[] nums, int k) {
    int left = 0, right = 0, res = 0;
    while (right < nums.Count()) {
      if (nums[right] == 0) {
        k -= 1;
      }

      right += 1;

      if (k >= 0) {
        res = Math.Max(res, right - left);
      }
      else {
        while (k < 0) {
          if (nums[left] == 0) {
            k += 1;
          }

          left += 1;
        }
      }
    }

    return res;
  }
}