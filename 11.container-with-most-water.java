/*
 * @lc app=leetcode id=11 lang=java
 *
 * [11] Container With Most Water
 */
class Solution {
    public int maxArea(int[] height) {
        int max = 0, left = 0, right = height.length - 1;
        while (left < right) {
            int area = (right - left) * Math.min(height[left], height[right]);
            max = Math.max(max, area);

            if (height[left] < height[right]) {
                int i = left;
                while (height[left] <= height[i] && left < right)
                    left++;
            } else {
                int j = right;
                while (height[j] >= height[right] && left < right)
                    right--;
            }
        }

        return max;
    }
}
