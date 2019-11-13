import java.util.HashMap;
import java.util.Map;

/*
 * @lc app=leetcode id=170 lang=java
 *
 * [170] Two Sum III - Data structure design
 */

// @lc code=start
class TwoSum {
    Map<Integer, Integer> map;

    /** Initialize your data structure here. */
    public TwoSum() {
        this.map = new HashMap<>();
    }

    /** Add the number to an internal data structure.. */
    public void add(int number) {
        map.put(number, map.getOrDefault(number, 0) + 1);
    }

    /** Find if there exists any pair of numbers which sum is equal to the value. */
    public boolean find(int value) {
        for (Integer i : map.keySet()) {
            Integer toFind = value - i;
            if (map.containsKey(toFind)) {
                if (i != toFind) {
                    return true;
                } else if (map.get(toFind) > 1) {
                    return true;
                }
            }
        }
        return false;
    }
}

/**
 * Your TwoSum object will be instantiated and called as such: TwoSum obj = new
 * TwoSum(); obj.add(number); boolean param_2 = obj.find(value);
 */
// @lc code=end
