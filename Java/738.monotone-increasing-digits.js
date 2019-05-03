/**
 * @param {number} N
 * @return {number}
 */
var monotoneIncreasingDigits = function(N) {
	let arr = [...String(N)].map(Number)
	let length = arr.length -1
	let index = length+1
	while(length > 0){
		if (arr[length] < arr[length-1]){
			arr[length - 1] --
			index = length
				
		}
			length --
	}
	arr.fill(9,index,arr.length)
	return Number(arr.join(""));
};