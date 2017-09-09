public class Solution {
	public int[] exclusiveTime(int n, List<String> logs) {
		int[] res = new int[n];
		Stack<Integer> stack = new Stack();
		int pre = 0;
		for (String log : logs) {
			String[] arr = log.split(":");
			if (arr[1].equals("start")) {
				if (!stack.isEmpty()) {
					res[stack.peek()] += Integer.parseInt(arr[2]) - pre;
				}
				stack.push(Integer.parseInt(arr[0]));
				pre = Integer.parseInt(arr[2]);
			} else {
				res[stack.pop()] += Integer.parseInt(arr[2]) - pre + 1;
				pre = Integer.parseInt(arr[2]) + 1;
			}
		}
		return res;
	}
}