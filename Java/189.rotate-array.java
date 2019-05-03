import java.util.Arrays;
import java.util.Collection;

public class Solution {
    public void rotate(int[] nums,  int k) {
        int L = nums.length, counter = 0, currentLoc = 0, starti = 0, prevVal = nums[currentLoc];
        k = k % L;
        while (counter++ < L) {
            if (currentLoc >= L && currentLoc % L == starti) { // this handles the case when currentLoc moves back to where started.
                currentLoc = ++starti;
                prevVal = nums[currentLoc];
            }

            int nextLoc = (currentLoc + k) % L; // get index of next location
            int nextVal = nums[nextLoc]; // get value at next location
            nums[nextLoc] = prevVal; // update value at next location
            prevVal = nextVal; // update previous value

            currentLoc += k; // move current to next location
        }
    }
}
