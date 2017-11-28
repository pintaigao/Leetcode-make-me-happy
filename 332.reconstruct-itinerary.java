public class Solution {
    public List<String> findItinerary(String[][] tickets) {
        List<String> ans = new ArrayList<String>();
        if (tickets == null || tickets.length == 0)
            return ans;
        Map<String, PriorityQueue<String>> ticketsMap = new HashMap<>();
        for (int i = 0; i < tickets.length; i++) {
            if (!ticketsMap.containsKey(tickets[i][0]))
                ticketsMap.put(tickets[i][0], new PriorityQueue<String>());
            ticketsMap.get(tickets[i][0]).add(tickets[i][1]);
        }

        String curr = "JFK";
        /* Stack的这种情况是为了解决有些有同样出发地的,但是目的地不同的情况*/
        Stack<String> drawBack = new Stack<String>();
        for (int i = 0; i < tickets.length; i++) {
            while (!ticketsMap.containsKey(curr) || ticketsMap.get(curr).isEmpty()) {
                drawBack.push(curr);
                curr = ans.remove(ans.size() - 1);
            }
            ans.add(curr);
            curr = ticketsMap.get(curr).poll();
        }
        ans.add(curr);
        while (!drawBack.isEmpty())
            ans.add(drawBack.pop());
        return ans;
    }
}