/**
 * @param {string[]} digits
 * @param {number} n
 * @return {number}
 */
var atMostNGivenDigitSet = function (digits, n) {
  let s = String(n), memo = new Map();

  function traveler(i, isLimit, isNum) {
    // 如果已经走到最后一位
    // 如果之前填过数字，说明形成了一个合法数字，返回 1
    // 如果一直没填数字，返回 0
    if (i === s.length) {
      return isNum ? 1 : 0;
    }

    let key = `${i},${isLimit},${isNum}`;

    if (memo.has(key)) {
      return memo.get(key);
    }

    let res = 0;

    // 前面还没有填数字，那么当前位可以继续跳过
    if (!isNum) {
      // 跳过当前位以后，数字长度一定比 n 短，所以 isLimit 变成 false
      // 仍然没有填数字，所以 isNum 还是 false
      res = traveler(i + 1, false, false);
    }

    // 如果当前受到 n 的限制，那么当前位最多只能填 s[i]
    // 否则最多可以填 '9'
    let up = isLimit ? s[i] : '9';

    // 枚举当前位要填的数字
    for (let d of digits) {
      if (d > up) {
        break;
      }

      // 如果当前受到限制，并且当前填的 d == up
      // 那么下一位仍然受到限制
      res += traveler(i + 1, isLimit && d === up, true);
    }

    memo.set(key, res);
    return res;
  }

  return traveler(0, true, false);
};

/**
 * @param {string[]} digits
 * @param {number} n
 * @return {number}
 */
var atMostNGivenDigitSet = function (digits, n) {
  let numberString = String(n).split(""), result = 0
  // 先统计位数比 n 少的所有数字数量
  // 比如 n 是 3 位数，那么先统计 1 位数、2 位数能组成多少个
  for (let i = 1; i < numberString.length; i++) {
    result += Math.pow(digits.length, i);
  }

  // 再统计和 n 位数相同，但是 <= n 的数字数量
  for (let i = 0; i < numberString.length; i++) {
    let compareNext = false;

    for (let digit of digits) {
      if (digit < numberString[i]) {
        result += Math.pow(digits.length, numberString.length - i - 1);
      } else {
        if (digit === numberString[i]) {
          compareNext = true;
        }

        break;
      }
    }

    // 如果当前这一位没有找到相等的 digit，
    // 说明后面不可能继续贴着 n 走了，直接返回
    if (!compareNext) {
      return result;
    }
  }

  // 如果每一位都能和 n 对上，说明 n 本身也可以由 digits 组成
  return result + 1;
};