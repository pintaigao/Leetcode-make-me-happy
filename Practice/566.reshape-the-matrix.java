class Solution {
	public int[][] matrixReshape(int[][] nums, int r, int c) {
		int rol = nums.length,col = nums[0].length;
		if(r*c > rol*col){
			return nums;
		}
		int[][] result = new int[r][c];
		for(int i = 0; i< rol*col;i++){
			result[i/c][i%c] = nums[i/col][i%col];
		}
		return result;
	}
}