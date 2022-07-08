/*
 * @lc app=leetcode id=362 lang=javascript
 *
 * [362] Design Hit Counter
 */

// @lc code=start

var HitCounter = function () {
  this.queue = [];
  this.count = 0;
};

/**
 * @param {number} timestamp
 * @return {void}
 */
HitCounter.prototype.hit = function (timestamp) {
  this.queue.push(timestamp);
  this.count += 1;
};

/**
 * @param {number} timestamp
 * @return {number}
 */
HitCounter.prototype.getHits = function (timestamp) {
  if (!this.queue.length) {
    return 0;
  }
  let peek = this.queue[0];
  /* 返回从这个timestamp开始到5分钟前之内的
   * 所以头部如果（即一开始的位置）如果是比5分钟前还要早，排除它
   */

  while (peek < timestamp - 299) {
    this.queue.shift();
    this.count -= 1;
    if (!this.queue.length) {
      return 0;
    }
    peek = this.queue[0];
  }

  return this.count;
};

/**
 * Your HitCounter object will be instantiated and called as such:
 * var obj = new HitCounter()
 * obj.hit(timestamp)
 * var param_2 = obj.getHits(timestamp)
 */
// @lc code=end
