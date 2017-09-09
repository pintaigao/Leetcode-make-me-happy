
public class Solution {
    public List<Integer> majorityElement(int[] nums) {
        int max1 = 0;
        int max2 = 1; //make sure these two numbers are different. 
        int count1 = 0;
        int count2 = 0;

        for (int num : nums) {
            if (num == max1) {
                count1++;
            } else if (num == max2) {
                count2++;
            } else if (count1 == 0) {
                max1 = num;
                count1 = 1;
            } else if (count2 == 0) {
                max2 = num;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }
        count1 = 0;
        count2 = 0;
        List<Integer> result = new ArrayList<Integer>();
        for (int num : nums) {
            if (num == max1) {
                count1++;
            } else if (num == max2) {
                count2++;
            }
        }
        if (count1 > nums.length / 3) {
            result.add(max1);
        }
        if (count2 > nums.length / 3) {
            result.add(max2);
        }
        return result;
    }

}