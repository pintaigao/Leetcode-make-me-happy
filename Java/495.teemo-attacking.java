public class Solution {
	public int findPoisonedDuration(int[] timeSeries, int duration) {
		if (timeSeries.length == 0)
			return 0;

		int start = timeSeries[0];
		int total = 0;

		for (int i = 1; i < timeSeries.length; ++i) {
			int curr = timeSeries[i];
			if (curr - start >= duration)
				total += duration;
			else
				total += curr - start;

			start = curr;
		}

		return total + duration;
	}
}