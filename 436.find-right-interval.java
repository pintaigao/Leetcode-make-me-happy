public class Solution {
   public int[] findRightInterval(Interval[] intervals) {
    Map<Integer, Integer> map = new HashMap<>();
    List<Integer> starts = new ArrayList<>();
    for (int i = 0; i < intervals.length; i++) {
        map.put(intervals[i].start, i);
        starts.add(intervals[i].start);
    }
    
    Collections.sort(starts);
    int[] res = new int[intervals.length];
    for (int i = 0; i < intervals.length; i++) {
        int end = intervals[i].end;
        int start = binarySearch(starts, end);
        if (start < end) {
            res[i] = -1;
        } else {
            res[i] = map.get(start);
        }
    }
    return res;
}

public int binarySearch(List<Integer> list, int x) {
    int left = 0, right = list.size() - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (list.get(mid) < x) { 
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return list.get(left);
}
}