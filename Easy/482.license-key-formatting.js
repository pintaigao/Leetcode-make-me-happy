/**
 * @param {string} S
 * @param {number} K
 * @return {string}
 */
var licenseKeyFormatting = function (S, K) {

  var noDashString = S.replace(/-/g, '')
  var firstGroupLength = noDashString.length % K == 0 ? K : noDashString.length % K
  var license = noDashString.slice(0, firstGroupLength)


  for (var i = firstGroupLength; i < noDashString.length; i += K) {
    license += '-' + noDashString.slice(i, i + K)
  }

  return license.toUpperCase()
};

// licenseKeyFormatting("2-5g-3-J",3);
