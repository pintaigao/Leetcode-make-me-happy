
/**
 * Definition for an interval.
 * public class Interval {
 *     int start;
 *     int end;
 *     Interval() { start = 0; end = 0; }
 *     Interval(int s, int e) { start = s; end = e; }
 * }
 */
public class Solution {

    public List<Interval> merge(List<Interval> intervals) {
        List<Interval> res = new LinkedList<>();
        if(intervals.size() < 2){
            return intervals;
        }
        Collections.sort(intervals,new Comparator<Interval>(){
            @Override
            public int compare(Interval i1,Interval i2){
                return i1.start - i2.start;
            }
        });
        Interval curr = intervals.get(0);
        for(Interval iter : intervals){
            if(curr.end >= iter.start){
                curr.end = Math.max(curr.end, iter.end);
            }else{
                res.add(curr);
                curr = iter;
            }
        }
        res.add(curr);
        return res;
    }
}