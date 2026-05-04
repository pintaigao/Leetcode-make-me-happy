const p = new Promise((resolve, reject) => {
  const success = true;

  setTimeout(() => {
    if (success) {
      resolve("Data loaded");
    } else {
      reject("Load failed");
    }
  }, 1000);
});

p.then((data) => {
  console.log("success:", data);
}).catch((err) => {
  console.log("error:", err);
}).finally(() => {
  console.log("done");
});