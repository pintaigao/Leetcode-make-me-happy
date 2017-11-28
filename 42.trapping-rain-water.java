import java.util.Stack;

class Solution {
	public int trap(int[] height) {
		if (height.length < 3)
			return 0;
		Stack<Integer> stack = new Stack();
		stack.push(0);
		int water = 0;
		for (int i = 1; i < height.length; i++) {
			if (height[i] > height[stack.peek()]) {
				int bottom = height[stack.pop()];
				while (!stack.isEmpty() && height[i] >= height[stack.peek()]) {
					water += (height[stack.peek()] - bottom) * (i - stack.peek() - 1);
					bottom = height[stack.pop()];
				}

				if (!stack.isEmpty())
					water += (height[i] - bottom) * (i - (stack.peek() + 1));  // 左边比右边高的情况
			}

			stack.push(i);
		}
		return water;
	}
}