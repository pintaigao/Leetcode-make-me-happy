Class Solution {
	func twoSum(_ numbers: [Int], _ target: Int) -> [Int] {
		var result : [Int] = [Int]();
		var start = 0, end = numbers.count
			while(start < end){
				var result1 = numbers[start] + numbers[end];
				if (result1 == target){
					result[0] = start + 1;
					result[1] = end + 1;
				}
				else if (result < target){
					start ++
				}
				else{ end--}
			}
		return result       
	}
}
