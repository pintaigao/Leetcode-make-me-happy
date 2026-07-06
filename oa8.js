function getMinimumOperations(arr) {
  const n = arr.length;

  let operations = Math.abs(arr[n - 1]);

  for (let i = 0; i < n - 1; i++) {
    operations += Math.abs(arr[i] - arr[i + 1]);
  }

  return operations;
}