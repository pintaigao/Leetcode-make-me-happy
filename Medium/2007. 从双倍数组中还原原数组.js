var findOriginalArray = function (changed) {
  if (changed.length % 2 !== 0) return [];

  changed.sort((a, b) => a - b);

  let count = new Map();
  let res = [];

  for (let num of changed) {
    count.set(num, (count.get(num) || 0) + 1);
  }

  for (let num of changed) {
    if (count.get(num) === 0) continue;

    let double = num * 2;

    if (!count.get(double)) {
      return [];
    }

    res.push(num);

    count.set(num, count.get(num) - 1);
    count.set(double, count.get(double) - 1);
  }

  return res;
};