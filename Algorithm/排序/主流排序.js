// 1.选择排序：固定一个，然后在他后面找比他小的，找到后就将这个和比他小的交换 时间复杂度O(N^2)
function SelectionSort(nums) {
  const n = nums.length;
  // sortedIndex 是一个分割线
  // 索引 < sortedIndex 的元素都是已排序的
  // 索引 >= sortedIndex 的元素都是未排序的
  // 初始化为 0，表示整个数组都是未排序的
  let sortedIndex = 0;
  while (sortedIndex < n) {
    // 找到未排序部分 [sortedIndex, n) 中最小值的索引
    // 1. 通过从这个sortedIndex位置开始的数，和他之后的数比较，不断更新 minIndex的值（所代表的当前情境下最小的数）
    let minIndex = sortedIndex;
    for (let i = sortedIndex + 1; i < n; i++) {
      if (nums[i] < nums[minIndex]) {
        minIndex = i;
      }
    }
    // 交换最小值和 sortedIndex 处的元素
    [nums[sortedIndex], nums[minIndex]] = [nums[minIndex], nums[sortedIndex]];

    // 当前 sortIndex 固定，sortedIndex 后移一位
    sortedIndex++;
  }
}

// 2. 冒泡排序：冒泡排序冒泡算法是对选择排序的一种优化 O（N^2）
// 对选择排序进行第一波优化，获得了稳定性
function sort(nums) {
  let n = nums.length;
  let sortedIndex = 0;
  while (sortedIndex < n) {
    // 在未排序部分中找到最小值 nums[minIndex]
    let minIndex = sortedIndex;
    for (let i = sortedIndex + 1; i < n; i++) {
      if (nums[i] < nums[minIndex]) {
        minIndex = i;
      }
    }

    // 优化：将 nums[minIndex] 插入到 nums[sortedIndex] 的位置
    // 将 nums[sortedIndex..minIndex] 的元素整体向后移动一位
    let minVal = nums[minIndex];
    // 数组搬移数据的操作
    for (let i = minIndex; i > sortedIndex; i--) {
      nums[i] = nums[i - 1];
    }
    nums[sortedIndex] = minVal;

    sortedIndex++;
  }
}

// 对选择排序进行第二波优化，获得稳定性的同时避免额外的 for 循环
// 这个算法有另一个名字，叫做冒泡排序
function sort(nums) {
  let n = nums.length, sortedIndex = 0;
  while (sortedIndex < n) {
    // 寻找 nums[sortedIndex..] 中的最小值
    // 同时将这个最小值逐步移动到 nums[sortedIndex] 的位置
    for (let i = n - 1; i > sortedIndex; i--) {
      if (nums[i] < nums[i - 1]) {
        // swap(nums[i], nums[i - 1])
        [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
      }
    }
    sortedIndex++;
  }
}

// 进一步优化，数组有序时提前终止算法
function sort(nums) {
  let n = nums.length;
  let sortedIndex = 0;
  while (sortedIndex < n) {
    // 加一个布尔变量，记录是否进行过交换操作
    let swapped = false;
    for (let i = n - 1; i > sortedIndex; i--) {
      if (nums[i] < nums[i - 1]) {
        // swap(nums[i], nums[i - 1])
        let tmp = nums[i];
        nums[i] = nums[i - 1];
        nums[i - 1] = tmp;
        swapped = true;
      }
    }
    // 如果一次交换操作都没有进行，说明数组已经有序，可以提前终止算法
    if (!swapped) {
      break;
    }
    sortedIndex++;
  }
}

// 3. 插入排序 时间复杂度O(N^2)
// 对选择排序进一步优化，向左侧有序数组中插入元素
// 这个算法有另一个名字，叫做插入排序
function sort(nums) {
  let n = nums.length;
  // 维护 [0, sortedIndex) 是有序数组
  let sortedIndex = 0;
  while (sortedIndex < n) {
    // 将 nums[sortedIndex] 插入到<重后往前>有序数组 [0, sortedIndex) 中
    for (let i = sortedIndex; i > 0; i--) {
      // 如果现在这个位置 i 的数字比前一个小，则交换他兩的位置
      if (nums[i] < nums[i - 1]) {
        // swap(nums[i], nums[i - 1])
        [nums[i], nums[i - 1]] = [nums[i - 1], nums[i]];
        // 然后 i--,继续往前看（这个已经交换位置的和前面的相比较）
      } else {
        // 否则说明他之前的已经排好序了
        break;
      }
    }
    // 更新即将要开始排序的位置
    sortedIndex++;
  }
}

// 以上时间复杂度都是 O(N^2)，以下
// 希尔排序，对 h 有序数组进行插入排序
// 逐渐缩小 h，最后 h=1 时，完成整个数组的排序
function sort(nums) {
  let n = nums.length;
  // 我们使用的生成函数是 2^(k-1)
  // 即 h = 1, 2, 4, 8, 16...
  let h = 1;
  while (h < Math.floor(n / 2)) {
    h = 2 * h;
  }

  // 改动一，把插入排序的主要逻辑套在 h 的 while 循环中
  while (h >= 1) {
    // 改动二，sortedIndex 初始化为 h，而不是 1
    let sortedIndex = h;
    while (sortedIndex < n) {
      // 改动三，把比较和交换元素的步长设置为 h，而不是相邻元素
      let i = sortedIndex;
      while (i >= h) {
        if (nums[i] < nums[i - h]) {
          // swap(nums[i], nums[i - h])
          let tmp = nums[i];
          nums[i] = nums[i - h];
          nums[i - h] = tmp;
        } else {
          break;
        }
        i -= h;
      }
      sortedIndex++;
    }

    // 按照递增函数的规则，缩小 h
    h = Math.floor(h / 2);
  }
}

// 快速排序算法 时间复杂度 O(nLogn)
var quickSort = function (nums) {
  var sort = function (lo, hi) {
    if (lo >= hi) {
      return;
    }
    // 切分数组，并获取切分点索引
    let p = partition(lo, hi);

    // 递归排序左侧和右侧子数组
    sort(lo, p - 1);
    sort(p + 1, hi);
  }

  var partition = function (lo, hi) {
    // 选择 nums[lo] 作为切分点元素
    let pivot = nums[lo];
    let i = lo + 1, j = hi;
    while (i <= j) {
      while (i < hi && nums[i] <= pivot) i++;
      while (j > lo && nums[j] > pivot) j--;
      if (i >= j) break;
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    // 将切分点元素放到正确的位置
    [nums[lo], nums[j]] = [nums[j], nums[lo]];
    // @visualize color *nums[j] #7cd930
    return j;
  }

  // 对整个数组进行递归排序
  sort(0, nums.length - 1);
}

// 对输入的 nums 进行原地排序
let nums = [3, 1, 7, 5, 9, 2, 8, 4, 1, 6, 5];
// @visualize shape nums rect
quickSort(nums);

// 归并排序算法
// 你可以多次点击 merge(nums, lo, mid, hi) 这一行代码，即可看到归并排序的递归过程和排序效果
var mergeSort = function (nums) {
  // 先给辅助数组开辟内存空间
  let temp = new Array(nums.length);
  // 定义：将子数组 nums[lo..hi] 进行排序
  var sort = function (nums, lo, hi) {
    if (lo === hi) {
      // 单个元素不用排序
      return;
    }
    // 这样写是为了防止溢出，效果等同于 (hi + lo) / 2
    let mid = lo + Math.floor((hi - lo) / 2);
    // 先对左半部分数组 nums[lo..mid] 排序
    sort(nums, lo, mid);
    // 再对右半部分数组 nums[mid+1..hi] 排序
    sort(nums, mid + 1, hi);
    // 将两部分有序数组合并成一个有序数组
    merge(nums, lo, mid, hi);
  }

  // 将 nums[lo..mid] 和 nums[mid+1..hi] 这两个有序数组合并成一个有序数组
  var merge = function (nums, lo, mid, hi) {
    // 先把 nums[lo..hi] 复制到辅助数组中
    // 以便合并后的结果能够直接存入 nums
    for (let i = lo; i <= hi; i++) {
      temp[i] = nums[i];
    }

    // 数组双指针技巧，合并两个有序数组
    let i = lo, j = mid + 1;
    // @visualize bind temp[i] temp[j] nums[p]
    for (let p = lo; p <= hi; p++) {
      if (i === mid + 1) {
        // 左半边数组已全部被合并
        nums[p] = temp[j++];
      } else if (j === hi + 1) {
        // 右半边数组已全部被合并
        nums[p] = temp[i++];
      } else if (temp[i] > temp[j]) {
        nums[p] = temp[j++];
      } else {
        nums[p] = temp[i++];
      }
      // @visualize color *nums[p] #7cd930
    }
  }

  // 排序整个数组（原地修改）
  sort(nums, 0, nums.length - 1);
}

// 测试代码
let nums = [3, 7, 5, 2, 6, 4, 5, 1];
// @visualize shape nums rect
mergeSort(nums);