/*
 * @lc app=leetcode id=638 lang=javascript
 *
 * [638] Shopping Offers
 */
/**
 * @param {number[]} price
 * @param {number[][]} special
 * @param {number[]} needs
 * @return {number}
 */
var shoppingOffers = function (price, special, needs) {

  function helper(needs) {
    let res = 0;
    for (let i = 0; i < needs.length; i++) {
      res += needs[i] * price[i];
    }

    console.log("这个是初始暴力的result： " + res);
    console.log("现在Loop两个special array");
    for (let j = 0; j < special.length; j++) {
      const tmp = []; //  每一个index表示A或B或C

      for (let i = 0; i < needs.length; i++) {

        if (needs[i] < special[j][i]) // 如果special offer 中的数量大于需要的，不要再继续了
          break;
        else
          tmp[i] = needs[i] - special[j][i];  //剩余要买的数量
      }
      
      if (tmp.length === needs.length) {
        res = Math.min(res, special[j][special[j].length - 1]
          + helper(tmp));
      }
    }
    return res;
  }

  return helper(needs);
};

// shoppingOffers([2, 5], [[3, 0, 5], [1, 2, 10]], [3, 2]);

