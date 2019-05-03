/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSumOfThreeSubarrays = function(nums, k) {
    let sumArray = [];
    let sum = 0;
    for(let i = 0;i< nums.length;i++){
        sum += nums[i];
        if(i >= k) sum -= nums[i-k];
        if(i >= k -1) sumArray[i-k+1] = sum;
    }

    let left = [];
    left[0] = 0;
    for(let i = 1;i<sumArray.length;i++){
        left[i] = sumArray[left[i-1]] >= sumArray[i] ? left[i-1] : i;
    }

    let right = [];
    right[sumArray.length - 1] = sumArray.length - 1;
    for (let i = sumArray.length - 2; i >= 0; i--) {
        right[i] = sumArray[right[i+1]] >= sumArray[i] ? right[i+1] : i;
    }

    let ans = [0, k, 2 * k];
    for (let i = k; i < sumArray.length - k; i++) {
        if (sumArray[i] + sumArray[left[i - k]] + sumArray[right[i + k]] > sumArray[ans[0]] + sumArray[ans[1]] + sumArray[ans[2]]) {
            ans = [left[i - k], i, right[i+k]]
        }
    }

    return ans;
};