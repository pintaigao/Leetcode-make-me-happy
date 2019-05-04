var missingNumber = function(nums) {
  let indexNum = new Array(nums.length+1);
  nums.forEach((num) => {
      indexNum[num] = 1;
  })
  
  for(let i = 0;i<indexNum.length;i++){
    if(indexNum[i] === undefined){ 
      console.log(i);
      return i
    }
  }
};

missingNumber([9,6,4,2,3,5,7,0,1]);