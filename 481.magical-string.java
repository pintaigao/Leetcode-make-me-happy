public class Solution {
	public int magicalString(int n) {
		if (n < 1)
			return 0;
		if (n == 1)
			return 1;

		int[] s = new int[n + 1];

		int val = 1;
		int index = 2;
		int count = 1;
		for (int i = 2; i < n + 1; i++) {
			val = val == 2 ? 1 : 2;
			s[index++] = val;
			if (val == 1)
				count++;
			if (index > n)
				break;
			if (s[i] == 2) {
				s[index++] = val;
				if (val == 1)
					count++;
				if (index > n)
					break;
			}
		}

		return count;
	}
}