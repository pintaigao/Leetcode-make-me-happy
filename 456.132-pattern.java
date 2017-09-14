import java.util.Stack;

class Solution {
    public boolean find132pattern(int[] nums) {
        int num = Integer.MIN_VALUE;
        Stack<Integer> stack = new Stack<>();
        for (int i = nums.length - 1; i >= 0; i--) {
            if (nums[i] < num)
                return true;
            else
                while (!stack.isEmpty() && nums[i] > stack.peek()) {
                    num = stack.pop();
                }
            stack.push(nums[i]);
        }
        return false;
    }
}

// bool find132pattern(vector<int>& nums) {
//     int s3 = INT_MIN;
//     stack<int> st;
//     for( int i = nums.size()-1; i >= 0; i -- ){
//         if( nums[i] < s3 ) return true;
//         else while( !st.empty() && nums[i] > st.top() ){ 
//           s3 = st.top(); st.pop(); 
//         }
//         st.push(nums[i]);
//     }
//     return false;
// }