public class Solution {
    public RandomListNode copyRandomList(RandomListNode head) {
        HashMap<RandomListNode, RandomListNode> nodemap = new HashMap<RandomListNode, RandomListNode>();
        return copyListHelper(head, nodemap);
    }

    public RandomListNode copyListHelper(RandomListNode head, HashMap<RandomListNode, RandomListNode> nodemap) {
        if (head == null)
            return null;
        if (nodemap.containsKey(head))
            return nodemap.get(head);
        RandomListNode ret = new RandomListNode(head.label);
        nodemap.put(head, ret);
        ret.next = copyListHelper(head.next, nodemap);
        ret.random = copyListHelper(head.random, nodemap);
        return ret;
    }
}