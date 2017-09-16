import java.util.Arrays;

class Solution {
    public int findMinArrowShots(int[][] points) {
        if(points.length == 0|| points[0].length == 0){
            return 0;
        }
        int[] start = new int[points.length],end = new int[points.length];
        int index = 0;
        for(int[] point : points){
            start[index] = point[0];
            end[index] = point[1];
            index ++;
        }
        Arrays.sort(start);
        Arrays.sort(end);
        int lastEnd = end[0];
        int index1 = 1;
        int result = 0;
        for(int i = 0;i < end.length;i++){
            if(lastEnd < start[i]){
                lastEnd = end[index1];
                index1 ++;
            }else{
                result ++ ;
            }
        }
        return result;
    }
}