/* 
Given a non-empty array of integers, return the k most frequent elements.

Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]
Note:

You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
 */

var topKFrequent = function(nums, k) {
    let array = [];
    let map = new Map();
    nums.forEach( item => {
      if(map.get(item) !== undefined){
        map.set(item,map.get(item)+1)
      }else{
        map.set(item,0);
      }
    });

    console.log(map);

    let allKeys = Array.from(map.keys());
    allKeys.forEach((key) => {
      let frequent = map.get(key);
      if(!array[frequent]){
        array[frequent] = new Array();
      }
      array[frequent].push(key);
    });

    console.log(array);
    

    let res = [];

    for(let pos = array.length-1 ;pos>=0 && res.length < k;pos--){

      if(array[pos] !== undefined){
        res.push(...array[pos]);
      }
    }

    console.log(res);
    return res;
};

topKFrequent([1],1);

