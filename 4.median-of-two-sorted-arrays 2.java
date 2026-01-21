/*
 * @lc app=leetcode id=4 lang=java
 *
 * [4] Median of Two Sorted Arrays
 */
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int[] total = new int[nums1.length + nums2.length];

        int i = 0, j = 0;
        int k = 0;
        while (i < nums1.length && j < nums2.length) {
            if (nums1[i] < nums2[j]) {
                total[k] = nums1[i];
                ++i;

            } else {
                total[k] = nums2[j];
                ++j;
            }
            ++k;
        }
        while (i < nums1.length) {
            total[k] = nums1[i];
            ++i;
            ++k;
        }
        while (j < nums2.length) {
            total[k] = nums2[j];
            ++j;
            ++k;
        }
        int len = total.length;
        if (len % 2 == 0) {
            return (total[len / 2] + total[(len / 2) - 1]) / 2.0;
        } else {
            return (double) total[len / 2];
        }

    }
}
