/*
 * @lc app=leetcode id=153 lang=javascript
 *
 * [153] Find Minimum in Rotated Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let [low, high] = [0, nums.length - 1];
  while (low < high) {
    // 取中间值
    const pivot = low + Math.floor((high - low) / 2);
    // 如果中间值小于最大值，则最大值减小
    // 疑问：为什么 high = mid;而不是 high = mid-1;
    // 解答：{4,5,1,2,3}，如果high=mid-1，则丢失了最小值1
    if (nums[pivot] < nums[high]) {
      high = pivot;
    } else {
      // 如果中间值大于最大值，则最小值变大
      // 疑问：为什么 low = mid+1;而不是 low = mid;
      // 解答：{4,5,6,1,2,3}，nums[mid]=6，low=mid+1,刚好nums[low]=1
      // 继续疑问：上边的解释太牵强了，难道没有可能low=mid+1,正好错过了最小值
      // 继续解答：不会错过!!! 如果nums[mid]是最小值的话，则其一定小于nums[high],走if，就不会走else了
      low = pivot + 1;
    }

    // 疑问：为什么while的条件是low<high,而不是low<=high呢
    // 解答：low<high，假如最后循环到{*,10,1,*}的这种情况时，nums[low]=10,nums[high]=1,nums[mid]=10,low=mid+1,
    //      直接可以跳出循环了,所以low<high,此时low指向的就是最小值的下标;
    //      如果low<=high的话，low=high，还会再不必要的循环一次，此时最后一次循环的时候会发生low==high==mid，
    //      则nums[mid]==nums[high]，则会走一次else语句，则low=mid+1,此时low指向的是最小值的下一个下标，
    //      则需要return[low-1]
  }
  return nums[low];
};
// @lc code=end
