var wordPattern = function(pattern, str) {
  var splitted = str.split(" ");
  if (pattern.length !== splitted.length) {
      return false;
  }
  
  var letters = {};
  var words = {};
  for (var i = 0; i < pattern.length; i++) {
      if (letters[pattern[i]] === undefined) {
          if (words[splitted[i]]) {
              return false;
          }
          letters[pattern[i]] = splitted[i];
          words[splitted[i]] = true;
      } else if (splitted[i] !== letters[pattern[i]]) {
          return false;
      }
  }
  
  return true;
};