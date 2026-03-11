export default function deepMerge(valA, valB) {
  // Both values are arrays.
  if (Array.isArray(valA) && Array.isArray(valB)) {
    return [...valA, ...valB];
  }

  // Both values are objects.
  if (typeof valA === "object" && typeof valB === "object") {
    const newObj = { ...valA };

    for (const key in valB) {
      if (!newObj[key]) {
        newObj[key] = valB[key];
      } else {
        console.log("Come here ");
        console.log(newObj[key]);
        console.log(valB[key]);

        console.log(typeof newObj[key]);
        console.log(typeof valB[key]);

        if (Array.isArray(newObj[key]) && Array.isArray(valB[key])) {
          console.log("Come here");
          newObj[key] = [...newObj[key], ...valB[key]];
        } else if (newObj.hasOwnProperty(key)) {
          newObj[key] = valB[key];
        } else if (typeof newObj[key] !== "object" && typeof valB[key] === "object") {
          newObj[key] = valB[key];
        } else if (typeof newObj[key] === "object" && typeof valB[key] !== "object") {
          newObj[key] = valB[key];
        }
      }
    }
    return newObj;
  }
}

console.log(deepMerge({ a: 1, b: [2] }, { b: [3, 4] }));
console.log(deepMerge({ a: 1 }, { a: 2 }));
