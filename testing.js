findNumOfSubstring = (string,target) => {
  let result = 0;
  let targetLength = target.length;
  for(let i = 0;i<string.length;i++){
    if(string[i] === target[0]){    
      let mock = string.substring(i,i+targetLength)
      console.log(mock);
      if(mock === target){
        result ++;
      }
    }
  }
  console.log(result);
  return result;
}

findNumOfSubstring("abcdedesdc","de");