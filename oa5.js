function minStepsToSort(arr) {
  let target = [...arr].sort((a, b) => a - b), startKey = arr.join(","), targetKey = target.join(","), queue = [[arr, 0]], visited = new Set([startKey]);
  if (startKey === targetKey) return 0;

  while (queue.length > 0) {
    const [cur, steps] = queue.shift();

    // Operation 1: rotate left by one
    const rotated = cur.slice(1).concat(cur[0]), rotatedKey = rotated.join(",");

    if (rotatedKey === targetKey) return steps + 1;

    if (!visited.has(rotatedKey)) {
      visited.add(rotatedKey);
      queue.push([rotated, steps + 1]);
    }

    // Operation 2: flip
    const flipped = [...cur].reverse(), flippedKey = flipped.join(",");

    if (flippedKey === targetKey) return steps + 1;

    if (!visited.has(flippedKey)) {
      visited.add(flippedKey);
      queue.push([flipped, steps + 1]);
    }
  }

  return -1;
}