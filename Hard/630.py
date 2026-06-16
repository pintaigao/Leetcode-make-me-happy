class Solution:
    def scheduleCourse(self, courses: List[List[int]]) -> int:
        courses.sort(key=lambda c: c[1])

        q = list()
        # 优先队列中所有课程的总时间
        total = 0

        for ti, di in courses:
            if total + ti <= di:
                total += ti
                # Python 默认是小根堆
                heapq.heappush(q, -ti)
            # -q[0] = -(-9) = 9， 因为现在 q 里面是[-9, -3, -2]
            elif q and -q[0] > ti:
                total -= -q[0] - ti
                heapq.heappop(q)
                heapq.heappush(q, -ti)

        return len(q)
