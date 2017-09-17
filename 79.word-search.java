public class Solution {
	public boolean exist(char[][] board, String word) {
		for(int i=0;i<board.length;i++){
			for(int j=0;j<board[i].length;j++){
				if(helper(board,i,j,word,0)){
					return true;
				}
			}
		}
		return false;
	}
	private boolean helper(char[][] board, int i, int j, String word, int step){
		if(step==word.length()){
			return true;
		}
		if(i<0||i>=board.length||j<0||j>=board[i].length){
			return false;
		}
		//开头挂就是直接挂
		if((board[i][j]-word.charAt(step))!=0){
			return false;
		}
		
		char record=board[i][j];
        board[i][j]='1'; //防止 i-1 或 j-1等等这些回来时发现又相等 比如【“aa”】,aaa 这个到第三个a，又回到【“aa”】中的第一个a了，防止回调
		boolean res=helper(board,i-1,j,word,step+1)
				||helper(board,i,j-1,word,step+1)
				||helper(board,i,j+1,word,step+1)
				||helper(board,i+1,j,word,step+1);
		board[i][j]=record;
		return res;
	}
}