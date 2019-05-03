public class Solution {
	public int findContentChildren(int[] g, int[] s) {
		if (g.length == 0 || s.length == 0)
			return 0;

		Arrays.sort(g);
		Arrays.sort(s);

		int i = 0;
		int j = 0;
		int result = 0;
		while (!(i >= g.length || j >= s.length)) {
			if (s[j] >= g[i]) {
				result++;
				j++;
				i++;
			} else {
				j++;
			}
		}
		return result;
	}
}