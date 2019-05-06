/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {
  let numInt = turnIntoRealNumber(num1);
  console.log(numInt);
  let num2Int = turnIntoRealNumber(num2);
  console.log(num2Int);
  let result = numInt + num2Int;
  console.log(result);
  return result + '';
};


function turnIntoRealNumber(num) {
  let result = 0;
  for(let i = 0; i < num.length; i++){
    result = result *10 + (num[i] - "0");
    console.log(result);
  }  
  return result;
}


// addStrings("9333852702227987","85731737104263");
console.log(933385270222798 * 10 + 3);
