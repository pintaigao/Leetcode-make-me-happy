import java.util.ArrayList;
import java.util.List;

/*
 * @lc app=leetcode id=210 lang=java
 *
 * [210] Course Schedule II
 */

// @lc code=start
class Solution {

    private int N = 0;

    public int[] findOrder(int numCourses, int[][] prerequisites) {
        int[] result = new int[numCourses];
        Course[] courses = new Course[numCourses];
        for (int i = 0; i < numCourses; i++) {
            courses[i] = new Course(i);
        }
        for (int i = 0; i < prerequisites.length; i++) {
            courses[prerequisites[i][0]].add(courses[prerequisites[i][1]]);
        }
        for (int i = 0; i < numCourses; i++) {
            if (isCyclic(courses[i], result)) {
                return new int[0];
            }
        }
        return result;
    }

    private boolean isCyclic(Course cur, int[] result) {
        if (cur.isGoing == true)
            return false;
        if (cur.visited == true)
            return true;
        cur.visited = true;
        for (Course c : cur.pre) {
            if (isCyclic(c, result)) {
                return true;
            }
        }
        cur.isGoing = true;
        result[N++] = cur.number;
        return false;
    }

    class Course {
        boolean visited = false;
        boolean isGoing = false;
        int number;
        List<Course> pre = new ArrayList<Course>();

        public Course(int i) {
            number = i;
        }

        public void add(Course c) {
            pre.add(c);
        }
    }
}
// @lc code=end
