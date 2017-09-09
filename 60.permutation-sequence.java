public class Solution {

    public String getPermutation(int n, int k) {
        StringBuilder sb = new StringBuilder();
		int[] array=new int[n+1];
		
		for (int i=0;i<n;i++)
			array[i]=i+1;
		array[n]=0;
		
		int perm=1;		
		for (int i=1;i<=n;i++) perm*=i;
					
    	doPermutationHelper(array,perm,n,k,sb);
    	return sb.toString();
        
    }
    private void doPermutationHelper(int[] a,int perm,int n,int k,StringBuilder sb){
        if (n==1) {
            sb.append(a[0]);
            return;
        }
        
        perm/=n;
        int i=(k-1)/perm;
        
        sb.append(a[i]);
        
        while (i<n-1) a[i++]=a[i];
        doPermutationHelper(a,perm,n-1,(k-1)%perm+1,sb);
    }
}