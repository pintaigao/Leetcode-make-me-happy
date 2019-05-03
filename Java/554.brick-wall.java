public class Solution {
	public int leastBricks(List<List<Integer>> wall) {
		Map<Integer, Integer> map = new HashMap<>();
		int max = 0;
		for(int i=0; i<wall.size(); i++){
			List<Integer> list = wall.get(i);
			int sum = 0;
			for(int j=0; j<list.size()-1; j++){
				sum += list.get(j);
				int val = map.getOrDefault(sum, 0) + 1;
				map.put(sum, val);
				max = Math.max(max, val);
			}
		}
		return wall.size()-max;
	}
}