import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Queue;
import java.util.spi.ResourceBundleControlProvider;

/*
 * @lc app=leetcode id=937 lang=java
 *
 * [937] Reorder Data in Log Files
 */
class Solution {

    public String[] reorderLogFiles(String[] logs) {
        Arrays.sort(logs, new Comparator<String>(){
            public int compare(String s1, String s2){
                String sub1 = s1.substring(s1.indexOf(" ")+1);
                String sub2 = s2.substring(s2.indexOf(" ")+1);
                if(!Character.isDigit(sub1.charAt(0)) && !Character.isDigit(sub2.charAt(0))){
                    int comp = sub1.compareTo(sub2);
                    if(comp != 0)
                        return comp;
                    return s1.substring(0, s1.indexOf(" ")).compareTo(s2.substring(0, s2.indexOf(" ")));
                }else if(!Character.isDigit(sub1.charAt(0))){
                    return -1;
                }else if(!Character.isDigit(sub2.charAt(0))){
                    return 1;
                }else{
                    return 0;
                }
            }
        });
        return logs;
    }
}
