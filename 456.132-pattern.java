import java.util.Stack;

class Solution {
	public boolean find132pattern(int[] nums) {
		for (int n = nums.length, i = n - 1, top = n, third = Integer.MIN_VALUE; i >= 0; i--) {
			if (nums[i] < third)
				return true;
			while (top < n && nums[i] > nums[top])
				third = nums[top++];
			nums[--top] = nums[i];
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