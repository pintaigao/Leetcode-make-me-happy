class Solution {
    public int[] findRedundantDirectedConnection(int[][] edges) {
        
 class Solution {
    public int[] findRedundantDirectedConnection(int[][] edges) {
        int len = edges.length;
        int[] arr = new int [len + 1];
        for(int i = 1; i <= len; i++) arr[i] = i;
        int[] res= new int[2];
        for(int[] e : edges){
            // case1 : 2 edges point to same point, no cycle in the graph.
            if(arr[e[1]] != e[1]){
                res = e;
                continue;
            } 
            int i = find(arr, e[0]), j = find(arr, e[1]);
            // case 2: There is a cycle in the graph.
            if(i == j ) {
                if(res[0] == 0) {
                    res = e;
                    continue;
                }
                return new int []{arr[res[1]], res[1]};
            }
            arr[e[1]] = e[0];
        }
        int root = 0;
       // Check union-find again to find if we delete the correct edge
        for(int i = 1; i <= len; i++){
            int j = find(arr, i);
            if(root == 0) root = j;
            else if(j != root ) return new int []{arr[res[1]], res[1]};
        }
        return res;
    }
    
    public int find(int[] arr, int val){
        while(val != arr[val]){
            val = arr[val];
        }
        return val;
    }
}   }
}