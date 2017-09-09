public class Solution {
	public boolean canPlaceFlowers(int[] f, int m) {
		int n = f.length;
		int p1 = -2;
		for (int i = 0; i < n; i++) {
			if (f[i] == 1)
				p1 = i;
			else {
				if (i - p1 == 2 && (i + 1 == n || f[i + 1] != 1)) {
					m--;
					p1 = i;
				}
			}
		}

		return m <= 0;
	}
}