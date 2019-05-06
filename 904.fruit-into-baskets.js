// 这个分两部分 1. 正常找两个different number的长度。 2. 如果遇到第三者，则找他前一个，应为要看看他前一个是不是也是连续的
const totalFruit = tree => {
  if (tree.length === 1) {
    return 1;
  }

  let max = 0;
  let set = new Set();
  let sum = 0;

  for (let i = 0; i < tree.length; ++i) {
    console.log("Hey we are looking into a new tree i is: "+i);
    
    if (set.size < 2 || set.has(tree[i])) {
      // console.log("set.size < 2 || set.has(tree[i]) is true and we will go to next tree and sum will be:" + (sum + 1));
      set.add(tree[i]);
      ++sum;
      continue;
    }
    max = Math.max(max, sum);
    console.log("Sum Sum !!! => "+ sum);

    // we the number is not in the set and the set is already full (has 2 records)
    // take i all the way back to the first instance of tree[i]
    let j = i - 1;

    console.log(`Ok now i is ${i} and max is ${max}`);
    

    let first = tree[j];
    let second = tree[i];

    console.log(`first is ${first} and second is ${second}`);

    sum = 1;
    set = new Set();
    set.add(second);
    set.add(first);
    while (tree[j] === first) {
      j--;
      sum++;
    }

    console.log(`now value of set is:`);
    console.log(set);
    console.log();
    
    
  }

  max = Math.max(max, sum);
  return max;
};

totalFruit([3,3,3,1,2,1,1,2,3,3,4]);
