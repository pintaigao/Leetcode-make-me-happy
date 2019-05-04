var strWithout3a3b = function(A, B) {
  let result = '';
  let letter1, letter2;
  if (A > B) {
      letter1 = 'a';
      letter2 = 'b';
  }
  else {
      let C = A;
      A = B;
      B = C;
      letter1 = 'b';
      letter2 = 'a';
  }
  let over = A - B;
  console.log(over);
  
  while (B > 0) {
      if (over > 0) {
          result += letter1 + letter1;
          A-=2;
      }
      else {
          result += letter1;
          A--;
      }
      result += letter2;
      B--;
      over--;
  }
  while (A > 0) {
      result += letter1;
      A--;
  }
  console.log(result);
  return result;
};

strWithout3a3b(4,1)