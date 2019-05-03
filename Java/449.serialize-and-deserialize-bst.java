/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
public class Codec {
    
        public String serialize(TreeNode root) {
            Queue<TreeNode> q=new LinkedList<TreeNode>();
            StringBuilder s=new StringBuilder();
            if(root==null)
            return "*-";
            q.add(root);
            while(!q.isEmpty()){
                TreeNode temp=q.remove();
                if(temp==null)
                s.append("*-");
                else{
                s.append(temp.val+"-");
                q.add(temp.left);
                q.add(temp.right);
                }
            }
            
            return s.toString();
        }
    
    // Decodes your encoded data to tree.
        public TreeNode deserialize(String data) {
           String[] val=data.split("-");
           
           if(val.length==0)
           return null;
           if(val[0].equals("*"))
           return null;
           Queue<TreeNode> q=new LinkedList<TreeNode>();
           TreeNode root=new TreeNode(Integer.parseInt(val[0]));
           q.add(root);
           for(int i=1;i<val.length;i=i+2){
               TreeNode Node=q.remove();
               if(!val[i].equals("*")){
                   Node.left=new TreeNode(Integer.parseInt(val[i]));
                   q.add(Node.left);
               }
               if(i+1<val.length && !val[i+1].equals("*")){
                   Node.right=new TreeNode(Integer.parseInt(val[i+1]));
                   q.add(Node.right);
               }
           }
        
           return root;
        }
    }
    
    // Your Codec object will be instantiated and called as such:
    // Codec codec = new Codec();
    // codec.deserialize(codec.serialize(root));