// 双指针
var removeElement = function (nums, val) {
  const n = nums.length;
  let point1 = 0;
  // right 指针一直往右跑
  for (let point2 = 0; point2 < n; point2++) {
    if (nums[point2] !== val) {
      nums[point1] = nums[point2];
      point1++;
    }
  }
  return point1;
};

// 快慢指针
var removeElement = function (nums, val) {
  let slow = 0, fast = 0, numsSize = nums.length; //一对夫妇，原本都是零起点
  while (fast < numsSize) {   //但是有一个跑得快，一个跑得慢
    if (nums[fast] != val) {    //于是跑得快的那个先去寻找共同目标
      nums[slow] = nums[fast];    //如果找到了，就送给跑得慢的那个
      slow++;     //然后跑得慢的那个也就离目标近一点
    }
    fast++; //但是不管是否找得到，跑得快的那方都一直奔跑到生命的尽头
  }
  return slow;    //最终留下跑得慢的一方
};

// 用英语阐述怎么做的，就像回答面试官一样，和面试官交流你的思路
// We use two pointers, a slow pointer and a fast pointer. The fast pointer iterates through the array, while the slow pointer keeps track of the position to place the next non-val element. Whenever the fast pointer finds an element that is not equal to val, we copy that element to the position indicated by the slow pointer and increment the slow pointer. This way, all non-val elements are moved to the front of the array, and the slow pointer's final position indicates the new length of the array without val elements.





