using System;
using System.Collections.Generic;

// Definition for a Node.
// public class Node {
//   public int val;
//   public Node left;
//   public Node right;
//   public Node next;
//
//   public Node() {}
//
//   public Node(int _val) {
//     val = _val;
//   }
//
//   public Node(int _val, Node _left, Node _right, Node _next) {
//     val = _val;
//     left = _left;
//     right = _right;
//     next = _next;
//   }
// }
public class Solution {
  public Node Connect(Node root) {
    if (root == null) {
      return root;
    }
    Queue<Node> queue = new Queue<Node>();
    queue.Enqueue(root);
    while (queue.Count > 0) {
      int size = queue.Count;
      Node[] level = queue.ToArray();
      // 将队列中的当前层元素串联起来
      Node tmp = level[0];
      for (int i = 1; i < size; i++) {
        tmp.next = level[i];
        tmp = level[i];
      }
      // 遍历队列中的每个元素，将每个元素的左右节点也放入队列中
      for (int i = 0; i < size; i++) {
        tmp = queue.Dequeue();
        if (tmp.left != null) {
          queue.Enqueue(tmp.left);
        }
        if (tmp.right != null) {
          queue.Enqueue(tmp.right);
        }
      }
    }
    return root;
  }
}