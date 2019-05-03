/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
	let ans = [];  
	let left = 0, top = 0,right = n - 1, down = n -1;
	let count = 1;
	for(let i = 0;i<n;i++){
		ans.push([]);
	}
	while(left <= right){
		for(let j = left;j<=right;j++){
			ans[top][j] = count ++;
		}
		top++;
		for(let i = top;i<= down;i++){
			ans[i][right] = count++;
		}
		right--;
		for(let j = right;j>=left;j--){
			ans[down][j] = count ++;
		}
		down--;
		for(let i = down;i>= top;i--){
			ans[i][left] = count++;
		}
		left ++
	}
	return ans;
};
